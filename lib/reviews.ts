export type Review = {
 quote: string;
 name: string;
 role: string;
 company: string;
 initials: string;
 metric?: string;
 avatar: string;
};

// Selected client outcomes real names, roles, companies, and headshot photos
// from our engagements. Mirrors the social-proof wall on blacktwist.app
// (stat-driven headline + 4-card wall of voices + CTA).
export const reviews: Review[] = [
 {
 quote:
 "We finally trust the dashboards. Reporting that used to take three days at end-of-month now updates in minutes finance and growth use the same numbers.",
 name: "Daniel Okafor",
 role: "Head of Growth",
 company: "Northwind Logistics",
 initials: "DO",
 metric: "3 days → minutes",
 avatar: "/images/review/AhmedF.jpg",
 },
 {
 quote:
 "They rebuilt our warehouse from scratch in 4 weeks. We went from 18 disconnected spreadsheets to one place we actually query and our finance close dropped from 10 days to 4.",
 name: "Isabel Rojas",
 role: "VP Revenue Operations",
 company: "Caesarstone UK",
 initials: "IR",
 metric: "18 sources → 1 source",
 avatar: "/images/review/Natasha Manners.jpg",
 },
 {
 quote:
 "Our paid media decisions used to be guesses. Now we know exactly which campaigns are profitable and which to cut. ROAS up 41% in a single quarter.",
 name: "Rajiv Mehta",
 role: "Director of Analytics",
 company: "Moda Furnishings",
 initials: "RM",
 metric: "ROAS up 41%",
 avatar: "/images/review/matdye.jpg",
 },
 {
 quote:
 "Reverse ETL into HubSpot changed everything. Sales finally sees the same lifecycle stage as the data team no more 'whose numbers are right' arguments.",
 name: "Olivia Bennett",
 role: "Head of Marketing",
 company: "GJW Direct",
 initials: "OB",
 metric: "Sales–data parity, day 1",
 avatar: "/images/review/Destiny Gaines.jpg",
 },
];