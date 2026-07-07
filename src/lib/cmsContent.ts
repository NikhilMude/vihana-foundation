export type SiteContent = {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
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

export function mergeSiteContent(content: Partial<SiteContent> | null | undefined): SiteContent {
  return {
    ...defaultSiteContent,
    ...(content || {}),
  };
}
