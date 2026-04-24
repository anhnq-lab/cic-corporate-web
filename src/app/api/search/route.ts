import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600; // ISR: cache 1 hour

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    switch (type) {
      case "products": {
        const { data } = await supabase
          .from("products")
          .select("id, name, slug, summary")
          .eq("is_published_web", true)
          .limit(200);

        return NextResponse.json(
          (data || []).map((p) => ({
            id: p.id,
            title: p.name,
            type: "product" as const,
            href: `/san-pham/${p.slug}`,
            description: p.summary || "",
          }))
        );
      }

      case "news": {
        const { data } = await supabase
          .from("cms_posts")
          .select("id, title_vi, slug, excerpt_vi")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(100);

        return NextResponse.json(
          (data || []).map((n) => ({
            id: n.id,
            title: n.title_vi,
            type: "news" as const,
            href: `/tin-tuc/${n.slug}`,
            description: n.excerpt_vi || "",
          }))
        );
      }

      case "services": {
        const { data } = await supabase
          .from("cms_services")
          .select("id, name_vi, slug, description_vi")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        return NextResponse.json(
          (data || []).map((s) => ({
            id: s.id,
            title: s.name_vi,
            type: "service" as const,
            href: `/dich-vu/${s.slug}`,
            description: s.description_vi || "",
          }))
        );
      }

      case "projects": {
        const { data } = await supabase
          .from("projects")
          .select("id, name, slug, location")
          .eq("is_published_web", true)
          .limit(100);

        return NextResponse.json(
          (data || []).map((p) => ({
            id: p.id,
            title: p.name,
            type: "project" as const,
            href: `/san-pham#${p.slug}`,
            description: p.location || "",
          }))
        );
      }

      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
