export type NavigationItem = {
  label: string;
  href: string;
};

export type EditableItem = {
  id: string;
  title: string;
  description: string;
  tag?: string;
  value?: string;
  linkLabel?: string;
  linkHref?: string;
};

export type CmsPage = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
  published: boolean;
};

export type SiteContent = {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImageUrl: string;
  heroPrimaryLabel: string;
  heroPrimaryHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;
  missionTitle: string;
  missionDescription: string;
  programsTitle: string;
  programsDescription: string;
  whyTitle: string;
  whyDescription: string;
  impactTitle: string;
  impactDescription: string;
  galleryTitle: string;
  galleryFeatureTitle: string;
  galleryFeatureDescription: string;
  donateTitle: string;
  donateDescription: string;
  upiId: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankIfsc: string;
  bankName: string;
  volunteerTitle: string;
  volunteerDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  navigationItems: NavigationItem[];
  missionPillars: EditableItem[];
  programCards: EditableItem[];
  whyFeatures: EditableItem[];
  impactStats: EditableItem[];
  impactNotes: EditableItem[];
  volunteerActions: EditableItem[];
  pages: CmsPage[];
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tag: string;
};

export const defaultSiteContent: SiteContent = {
  heroBadge: "Founded in honor of Vihana",
  heroTitle: "Every Birthday.",
  heroHighlight: "A Thousand Smiles.",
  heroDescription:
    "Vihana Foundation turns celebrations into meaningful care for children through learning support, nourishing meals, health access and community-led kindness.",
  heroImageUrl: "/illustrations/hero.png",
  heroPrimaryLabel: "Join the Movement",
  heroPrimaryHref: "#volunteer",
  heroSecondaryLabel: "Our Story",
  heroSecondaryHref: "#mission",
  missionTitle: "Turning personal celebration into public good.",
  missionDescription:
    "Vihana Foundation was created from a simple belief: joy becomes more powerful when it is shared. Each initiative helps children feel seen, supported and ready to build a brighter future.",
  programsTitle: "Focused care for the moments that shape childhood.",
  programsDescription:
    "Each program is practical, measurable and built with community partners who understand what children need on the ground.",
  whyTitle: "Compassion that is organized, transparent and close to the community.",
  whyDescription:
    "A beautiful mission needs disciplined execution. Vihana Foundation brings warmth and structure together so every contribution has a clear path to impact.",
  impactTitle: "Small acts become measurable change.",
  impactDescription:
    "These numbers represent shared meals, steady learning, timely care and volunteers choosing to show up.",
  galleryTitle: "Moments of kindness, captured in action.",
  galleryFeatureTitle: "A celebration becomes a child's brighter tomorrow.",
  galleryFeatureDescription:
    "The gallery will grow with real photos from drives, school outreach, health camps and birthday campaigns.",
  donateTitle: "Give with clarity and confidence.",
  donateDescription:
    "Donation information is ready as a website section. Replace the placeholders with your verified charity payment details before accepting public donations.",
  upiId: "vihanafoundation@upi",
  bankAccountName: "Vihana Foundation",
  bankAccountNumber: "Add account number",
  bankIfsc: "Add IFSC",
  bankName: "Add bank name",
  volunteerTitle: "Help make Vihana's birthday a reason for many children to smile.",
  volunteerDescription:
    "Start with one act: sponsor a meal, contribute school supplies, volunteer at a drive or build a birthday campaign with your family.",
  contactEmail: "hello@vihanafoundation.org",
  contactPhone: "+91 98765 43210",
  contactLocation: "India",
  navigationItems: [
    { label: "Home", href: "#home" },
    { label: "About Vihana", href: "/about-vihana" },
    { label: "Mission", href: "#mission" },
    { label: "Programs", href: "#programs" },
    { label: "Impact", href: "#impact" },
    { label: "Gallery", href: "#gallery" },
    { label: "Donate", href: "#donate" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  missionPillars: [
    {
      id: "learning",
      title: "Learning",
      description: "School supplies, mentoring and digital support that help children stay curious and confident.",
    },
    {
      id: "nutrition",
      title: "Nutrition",
      description: "Healthy meals and essential food support for children and families facing daily hardship.",
    },
    {
      id: "care",
      title: "Care",
      description: "Health awareness, preventive checkups and practical help delivered with dignity.",
    },
    {
      id: "trust",
      title: "Trust",
      description: "Clear stewardship, local partnerships and responsible use of every contribution.",
    },
  ],
  programCards: [
    {
      id: "education",
      title: "Education Support",
      description: "School kits, scholarships, digital access and mentoring that reduce barriers to learning.",
      linkLabel: "Support this program",
      linkHref: "#volunteer",
    },
    {
      id: "food",
      title: "Food and Nutrition",
      description: "Meal drives, ration support and nutrition-focused outreach for children and families.",
      linkLabel: "Support this program",
      linkHref: "#volunteer",
    },
    {
      id: "health",
      title: "Health and Wellness",
      description: "Medical camps, wellness awareness and preventive care through trusted local partners.",
      linkLabel: "Support this program",
      linkHref: "#volunteer",
    },
    {
      id: "community",
      title: "Community and Environment",
      description: "Clean surroundings, tree plantation and civic initiatives that strengthen neighborhoods.",
      linkLabel: "Support this program",
      linkHref: "#volunteer",
    },
  ],
  whyFeatures: [
    {
      id: "origin",
      title: "Personal Origin",
      description: "Inspired by Vihana, the foundation carries a deeply human promise: celebrate life by improving another child's day.",
    },
    {
      id: "partners",
      title: "Local Partnerships",
      description: "Programs are delivered with schools, volunteers and community partners who know where support matters most.",
    },
    {
      id: "sustainable",
      title: "Sustainable Action",
      description: "We focus on repeatable, practical initiatives that can grow without losing care, accountability or warmth.",
    },
    {
      id: "dignity",
      title: "Dignity First",
      description: "Every act of service is designed to respect families, protect children and create confidence rather than dependency.",
    },
  ],
  impactStats: [
    { id: "children", value: "500+", title: "Children supported", description: "" },
    { id: "meals", value: "10K+", title: "Meals served", description: "" },
    { id: "volunteers", value: "100+", title: "Volunteers engaged", description: "" },
    { id: "trees", value: "2K+", title: "Trees planted", description: "" },
  ],
  impactNotes: [
    {
      id: "birthdays",
      title: "Birthday campaigns",
      description: "Families can dedicate birthdays to meals, school supplies or health support.",
    },
    {
      id: "giving",
      title: "Direct giving",
      description: "Contributions are directed toward practical, visible community needs.",
    },
    {
      id: "delivery",
      title: "Accountable delivery",
      description: "Programs are tracked so supporters can understand the difference they helped create.",
    },
  ],
  volunteerActions: [
    {
      id: "birthday",
      title: "Dedicate a birthday",
      description: "Turn a special day into meals, books, school kits or health support.",
    },
    {
      id: "time",
      title: "Volunteer time",
      description: "Help organize drives, mentor children or support community outreach.",
    },
    {
      id: "partner",
      title: "Partner with us",
      description: "Collaborate through schools, companies, local groups or family campaigns.",
    },
  ],
  pages: [
    {
      id: "about-vihana",
      slug: "about-vihana",
      title: "About Vihana",
      description: "The story and spirit behind Vihana Foundation.",
      body: "Vihana Foundation was created to turn love, celebration and gratitude into practical help for children and families.",
      buttonLabel: "Join the Movement",
      buttonHref: "/#volunteer",
      published: true,
    },
    {
      id: "contact-us",
      slug: "contact-us",
      title: "Contact Us",
      description: "Reach Vihana Foundation for volunteering, donations, partnerships and birthday campaigns.",
      body: "We would love to hear from you.\n\nUse the volunteer form on the homepage to send your message, or contact us directly using the phone and email details listed on the website.\n\nYou can reach out for birthday campaigns, donations, volunteering, school partnerships, health camps or community initiatives.",
      buttonLabel: "Send A Message",
      buttonHref: "/#volunteer",
      published: true,
    },
  ],
};

export const defaultGalleryItems: GalleryItem[] = [
  {
    id: "meal-drives",
    title: "Meal Drives",
    description: "Fresh, nourishing food shared with children and families.",
    imageUrl: "",
    tag: "Nutrition",
  },
  {
    id: "school-support",
    title: "School Support",
    description: "Kits, supplies and mentoring that make learning easier.",
    imageUrl: "",
    tag: "Education",
  },
  {
    id: "health-camps",
    title: "Health Camps",
    description: "Preventive care and wellness awareness in local communities.",
    imageUrl: "",
    tag: "Health",
  },
];

function arrayOrDefault<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

export function mergeSiteContent(content: Partial<SiteContent> | null | undefined): SiteContent {
  const merged = {
    ...defaultSiteContent,
    ...(content || {}),
  };
  const navigationItems = arrayOrDefault(merged.navigationItems, defaultSiteContent.navigationItems);
  const pages = arrayOrDefault(merged.pages, defaultSiteContent.pages);
  const navigationWithDefaults = [
    ...navigationItems,
    ...defaultSiteContent.navigationItems.filter(
      (defaultItem) => !navigationItems.some((item) => item.href === defaultItem.href)
    ),
  ];
  const pagesWithDefaults = [
    ...pages,
    ...defaultSiteContent.pages.filter(
      (defaultPage) => !pages.some((page) => page.slug === defaultPage.slug)
    ),
  ];

  return {
    ...merged,
    navigationItems: navigationWithDefaults,
    missionPillars: arrayOrDefault(merged.missionPillars, defaultSiteContent.missionPillars),
    programCards: arrayOrDefault(merged.programCards, defaultSiteContent.programCards),
    whyFeatures: arrayOrDefault(merged.whyFeatures, defaultSiteContent.whyFeatures),
    impactStats: arrayOrDefault(merged.impactStats, defaultSiteContent.impactStats),
    impactNotes: arrayOrDefault(merged.impactNotes, defaultSiteContent.impactNotes),
    volunteerActions: arrayOrDefault(merged.volunteerActions, defaultSiteContent.volunteerActions),
    pages: pagesWithDefaults,
  };
}
