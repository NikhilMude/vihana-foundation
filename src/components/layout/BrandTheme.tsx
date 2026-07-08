import { SiteContent } from "@/lib/cmsContent";

function cleanColor(value: string, fallback: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

export default function BrandTheme({ content }: { content: SiteContent }) {
  const primary = cleanColor(content.brandPrimaryColor, "#0f766e");
  const secondary = cleanColor(content.brandSecondaryColor, "#fbbf24");
  const accent = cleanColor(content.brandAccentColor, "#0ea5e9");
  const text = cleanColor(content.brandTextColor, "#020617");
  const background = cleanColor(content.brandBackgroundColor, "#fafaf8");

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --primary: ${primary};
            --secondary: ${secondary};
            --accent: ${accent};
            --text: ${text};
            --foreground: ${text};
            --background: ${background};
            --ring: ${primary};
            --chart-1: ${primary};
            --chart-2: ${secondary};
            --chart-3: ${accent};
            --sidebar-primary: ${primary};
          }
        `,
      }}
    />
  );
}
