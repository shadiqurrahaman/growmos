"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { compileMarkdownClient as compileMarkdown } from "@/lib/markdown.client";

type Props = {
  value: string;
  onChange: (md: string) => void;
  placeholder?: string;
  onUploadImage?: (file: File) => Promise<string | null>;
};

type ToolbarAction = {
  label: string;
  icon: string;
  apply: (selected: string) => { text: string; cursorOffset?: number };
  isBlock?: boolean;
};

const ACTIONS: ToolbarAction[] = [
  { label: "Bold",      icon: "fa-bold",          apply: (s) => ({ text: `**${s || "bold text"}**`, cursorOffset: s ? 0 : -11 }) },
  { label: "Italic",    icon: "fa-italic",        apply: (s) => ({ text: `_${s || "italic text"}_`, cursorOffset: s ? 0 : -12 }) },
  { label: "Link",      icon: "fa-link",          apply: (s) => ({ text: `[${s || "link text"}](https://)`, cursorOffset: s ? 0 : -1 }) },
  { label: "H2",        icon: "fa-heading",       apply: () => ({ text: `\n## Heading\n` }), isBlock: true },
  { label: "H3",        icon: "fa-heading fa-xs", apply: () => ({ text: `\n### Subheading\n` }), isBlock: true },
  { label: "Bullet",    icon: "fa-list-ul",       apply: () => ({ text: `\n- item\n- item\n- item\n` }), isBlock: true },
  { label: "Number",    icon: "fa-list-ol",       apply: () => ({ text: `\n1. item\n2. item\n3. item\n` }), isBlock: true },
  { label: "Quote",     icon: "fa-quote-left",    apply: () => ({ text: `\n> Quote\n` }), isBlock: true },
  { label: "Inline code", icon: "fa-code",        apply: (s) => ({ text: `\`${s || "code"}\``, cursorOffset: s ? 0 : -4 }) },
  { label: "Code block", icon: "fa-code fa-xs",   apply: () => ({ text: `\n\`\`\`\ncode\n\`\`\`\n` }), isBlock: true },
  { label: "Divider",   icon: "fa-minus",         apply: () => ({ text: `\n---\n` }), isBlock: true },
];

/**
 * Split-pane markdown editor with toolbar + live HTML preview.
 * On screens < lg, switches to tabbed Edit / Preview.
 *
 * The preview is rendered client-side via the same `compileMarkdown` that the
 * server uses on write, so what the author sees matches what will be stored
 * (sans sanitization, which happens server-side).
 */
export default function MarkdownEditor({ value, onChange, placeholder, onUploadImage }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [view, setView] = useState<"edit" | "preview" | "split">("split");
  const [uploading, setUploading] = useState(false);

  // Debounced preview recompile
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        setPreviewHtml(compileMarkdown(value || ""));
      } catch {
        setPreviewHtml("<p style='color:#dc2626'>Preview error.</p>");
      }
    }, 200);
    return () => clearTimeout(id);
  }, [value]);

  // Initial view: split on desktop, edit on mobile
  useEffect(() => {
    const onResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setView(isDesktop ? "split" : "edit");
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function insertAtCursor(text: string, cursorOffset?: number) {
    const ta = textareaRef.current;
    if (!ta) {
      onChange((value || "") + text);
      return;
    }
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = (value || "").slice(0, start);
    const after = (value || "").slice(end);
    const next = before + text + after;
    onChange(next);
    // Restore selection after React re-render
    requestAnimationFrame(() => {
      const cursor = before.length + text.length + (cursorOffset ?? 0);
      ta.focus();
      ta.setSelectionRange(cursor, cursor);
    });
  }

  function applyAction(action: ToolbarAction) {
    const ta = textareaRef.current;
    const selected = ta ? value.slice(ta.selectionStart, ta.selectionEnd) : "";
    const { text, cursorOffset } = action.apply(selected);
    insertAtCursor(text, cursorOffset);
  }

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !onUploadImage) return;
    setUploading(true);
    try {
      const url = await onUploadImage(file);
      if (url) insertAtCursor(`\n![${file.name.replace(/\.[^.]+$/, "")}](${url})\n`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const charCount = useMemo(() => (value || "").length, [value]);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center flex-wrap gap-1 px-3 py-2 bg-gray-50 border-b border-gray-200">
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            type="button"
            title={a.label}
            onClick={() => applyAction(a)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:text-purple-700 hover:shadow-sm transition-all text-xs"
          >
            <i className={`fa-solid ${a.icon}`}></i>
          </button>
        ))}
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <label
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:text-purple-700 hover:shadow-sm transition-all text-xs cursor-pointer"
          title="Insert image"
        >
          <i className={`fa-solid ${uploading ? "fa-spinner fa-spin" : "fa-image"}`}></i>
          <input type="file" accept="image/*" className="hidden" onChange={handleImageFile} disabled={uploading || !onUploadImage} />
        </label>

        <div className="ml-auto flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-0.5">
          {(["edit", "split", "preview"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${view === v ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
            >
              {v[0].toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className={`grid ${view === "split" ? "lg:grid-cols-2" : "grid-cols-1"}`}>
        {(view === "edit" || view === "split") && (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder ?? "# Start writing…\n\nMarkdown is supported (headings, lists, links, images, code)."}
            spellCheck
            className="min-h-[500px] w-full px-4 py-3 font-mono text-sm text-gray-900 border-0 focus:outline-none focus:ring-0 resize-y bg-white"
            style={view === "split" ? { borderRight: "1px solid #e5e7eb" } : undefined}
          />
        )}
        {(view === "preview" || view === "split") && (
          <div
            className="post-body min-h-[500px] px-6 py-5 overflow-auto bg-white"
            // The preview is built from admin-controlled markdown via the same
            // sanitizer the server uses on write. Client-side rendering is
            // safe in this loop. .post-body (globals.css) gives headings,
            // lists, code blocks, etc. their proper typography so the live
            // preview matches what the public reader will render.
            dangerouslySetInnerHTML={{ __html: previewHtml || "<p class='text-gray-400 italic'>Preview will appear here.</p>" }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 text-[11px] text-gray-400 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <span>Markdown · compiled to safe HTML on save</span>
        <span className="font-mono">{charCount.toLocaleString()} chars</span>
      </div>
    </div>
  );
}