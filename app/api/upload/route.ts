import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getAdminFromCookie } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

function configureCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return false;
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
  return true;
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json({ error: "Invalid file type. Use JPG, PNG, WebP, or GIF." }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large. Max 10 MB." }, { status: 400 });
    }

    if (!configureCloudinary()) {
      return NextResponse.json(
        { error: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment." },
        { status: 500 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Strip extension — Cloudinary generates its own
    const originalName = file.name.replace(/\.[^.]+$/, "");
    const safeName = originalName.toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 80) || "image";
    const folder = process.env.CLOUDINARY_UPLOAD_PRESET ? "growmos/blogs" : "growmos/blogs";

    const result = await new Promise<{ secure_url: string; public_id: string; width: number; height: number; format: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            public_id: `${Date.now()}-${safeName}`,
            resource_type: "image",
            // Eager transformation: deliver webp at q80, max 1600x900 (no upscaling)
            eager: [{ format: "webp", quality: 80, width: 1600, height: 900, crop: "limit" }],
            eager_async: false,
          },
          (err, res) => {
            if (err || !res) return reject(err || new Error("Cloudinary upload failed"));
            resolve(res as { secure_url: string; public_id: string; width: number; height: number; format: string });
          }
        );
        stream.end(buffer);
      }
    );

    // Prefer the eager-transformed webp URL if present; fall back to original
    const optimizedUrl =
      (result as unknown as { eager?: { secure_url: string }[] }).eager?.[0]?.secure_url ||
      result.secure_url;

    return NextResponse.json({
      url: optimizedUrl,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (err) {
    console.error("Upload error:", err);
    const msg = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
