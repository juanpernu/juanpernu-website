import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";

export const alt = "Portada del post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.frontmatter.title ?? siteConfig.name;
  const description = post?.frontmatter.description ?? "";
  const date = post
    ? new Date(post.frontmatter.date).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "64px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                backgroundColor: "#22d3ee",
              }}
            />
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#a1a1aa",
              }}
            >
              Blog
            </div>
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            {date}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: title.length > 40 ? 64 : 80,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#fafafa",
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                fontSize: 30,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#a1a1aa",
              }}
            >
              {description}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#fafafa",
            }}
          >
            {siteConfig.author}
          </div>
          <div
            style={{
              fontSize: 24,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#22d3ee",
            }}
          >
            juanpernumian.com.ar
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
