export type NavigationItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  iconImageUrl?: string;
};

export type EditableItem = {
  id: string;
  title: string;
  description: string;
  tag?: string;
  value?: string;
  icon?: string;
  imageUrl?: string;
  name?: string;
  role?: string;
  quote?: string;
  question?: string;
  answer?: string;
  date?: string;
  summary?: string;
  linkLabel?: string;
  linkHref?: string;
};

export type SectionConfig = {
  id: string;
  label: string;
  visible: boolean;
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
  brandName: string;
  brandTagline: string;
  logoImageUrl: string;
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
  missionEyebrow: string;
  missionDescription: string;
  programsTitle: string;
  programsEyebrow: string;
  programsDescription: string;
  whyTitle: string;
  whyEyebrow: string;
  whyDescription: string;
  impactTitle: string;
  impactEyebrow: string;
  impactDescription: string;
  galleryTitle: string;
  galleryEyebrow: string;
  galleryFeatureTitle: string;
  galleryFeatureDescription: string;
  donateTitle: string;
  donateEyebrow: string;
  donateDescription: string;
  upiId: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankIfsc: string;
  bankName: string;
  legalStatusNote: string;
  registrationNumber: string;
  panNumber: string;
  taxExemptionNote: string;
  annualReportHref: string;
  founderStory: string;
  volunteerTitle: string;
  volunteerEyebrow: string;
  volunteerDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImageUrl: string;
  floatingDonateText: string;
  floatingDonateHref: string;
  floatingDonateColor: string;
  floatingDonateTextColor: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  ctaButtonHref: string;
  ctaBackground: string;
  storyEyebrow: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  faqEyebrow: string;
  faqTitle: string;
  newsEyebrow: string;
  newsTitle: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterEmailSubject: string;
  newsletterEmailBody: string;
  navigationItems: NavigationItem[];
  socialLinks: SocialLink[];
  sectionOrder: SectionConfig[];
  missionPillars: EditableItem[];
  programCards: EditableItem[];
  whyFeatures: EditableItem[];
  impactStats: EditableItem[];
  impactNotes: EditableItem[];
  volunteerActions: EditableItem[];
  featuredStory: EditableItem;
  testimonials: EditableItem[];
  faqs: EditableItem[];
  newsItems: EditableItem[];
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
  brandName: "Vihana",
  brandTagline: "Foundation",
  logoImageUrl: "",
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
  missionEyebrow: "Our Mission",
  missionDescription:
    "Vihana Foundation was created from a simple belief: joy becomes more powerful when it is shared. Each initiative helps children feel seen, supported and ready to build a brighter future.",
  programsTitle: "Focused care for the moments that shape childhood.",
  programsEyebrow: "Our Programs",
  programsDescription:
    "Each program is practical, measurable and built with community partners who understand what children need on the ground.",
  whyTitle: "Compassion that is organized, transparent and close to the community.",
  whyEyebrow: "Why Vihana",
  whyDescription:
    "A beautiful mission needs disciplined execution. Vihana Foundation brings warmth and structure together so every contribution has a clear path to impact.",
  impactTitle: "Small acts become measurable change.",
  impactEyebrow: "Our Impact",
  impactDescription:
    "These numbers represent shared meals, steady learning, timely care and volunteers choosing to show up.",
  galleryTitle: "Moments of kindness, captured in action.",
  galleryEyebrow: "Gallery",
  galleryFeatureTitle: "A celebration becomes a child's brighter tomorrow.",
  galleryFeatureDescription:
    "The gallery will grow with real photos from drives, school outreach, health camps and birthday campaigns.",
  donateTitle: "Give with clarity and confidence.",
  donateEyebrow: "Donate",
  donateDescription:
    "Donation information is ready as a website section. Replace the placeholders with your verified charity payment details before accepting public donations.",
  upiId: "test-vihana@upi",
  bankAccountName: "Vihana Foundation Test",
  bankAccountNumber: "000000000000",
  bankIfsc: "TEST0001234",
  bankName: "Test Bank",
  legalStatusNote: "Legal registration details will be published after formal verification.",
  registrationNumber: "",
  panNumber: "",
  taxExemptionNote: "",
  annualReportHref: "",
  founderStory:
    "Vihana Foundation was created as a family-led act of gratitude, inspired by Vihana's birthday and the belief that personal celebrations can become meaningful support for children. The foundation is being shaped to support education, nutrition, healthcare and community care with transparency, dignity and warmth.",
  volunteerTitle: "Help make Vihana's birthday a reason for many children to smile.",
  volunteerEyebrow: "Volunteer",
  volunteerDescription:
    "Start with one act: sponsor a meal, contribute school supplies, volunteer at a drive or build a birthday campaign with your family.",
  contactEmail: "hello@vihanafoundation.org",
  contactPhone: "+91 98765 43210",
  contactLocation: "India",
  metaTitle: "Vihana Foundation | Every Birthday. A Thousand Smiles.",
  metaDescription:
    "Vihana Foundation turns celebrations into education, nutrition, healthcare and community support for children and families.",
  metaKeywords: "Vihana Foundation, charity, NGO, children, education, nutrition, healthcare, birthday campaign",
  ogImageUrl: "/illustrations/hero.png",
  floatingDonateText: "Donate",
  floatingDonateHref: "#donate",
  floatingDonateColor: "#0f766e",
  floatingDonateTextColor: "#ffffff",
  ctaHeading: "Make one celebration meaningful for many children.",
  ctaDescription:
    "Your support can become meals, learning materials, care and confidence for children who need it most.",
  ctaButtonText: "Start a Birthday Campaign",
  ctaButtonHref: "#volunteer",
  ctaBackground: "#0f766e",
  storyEyebrow: "Featured Story",
  testimonialsEyebrow: "Testimonials",
  testimonialsTitle: "Voices from the Vihana community.",
  faqEyebrow: "FAQ",
  faqTitle: "Questions families and supporters often ask.",
  newsEyebrow: "News & Activities",
  newsTitle: "Recent moments and upcoming work.",
  newsletterHeading: "Stay connected with Vihana Foundation.",
  newsletterDescription:
    "Receive updates about campaigns, volunteer opportunities and stories of impact.",
  newsletterPlaceholder: "Email address",
  newsletterButtonText: "Subscribe",
  newsletterEmailSubject: "Vihana Foundation Update",
  newsletterEmailBody:
    "Dear supporter,\n\nThank you for being part of the Vihana Foundation community.\n\nWe are grateful for your kindness and support.\n\nWith gratitude,\nVihana Foundation",
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
  socialLinks: [
    { id: "instagram", label: "Instagram", href: "", iconImageUrl: "" },
    { id: "facebook", label: "Facebook", href: "", iconImageUrl: "" },
    { id: "youtube", label: "YouTube", href: "", iconImageUrl: "" },
    { id: "linkedin", label: "LinkedIn", href: "", iconImageUrl: "" },
  ],
  sectionOrder: [
    { id: "hero", label: "Hero", visible: true },
    { id: "mission", label: "Mission", visible: true },
    { id: "programs", label: "Programs", visible: true },
    { id: "why", label: "Why Vihana", visible: true },
    { id: "impact", label: "Impact Stats", visible: true },
    { id: "story", label: "Featured Story", visible: true },
    { id: "cta", label: "Donation CTA", visible: true },
    { id: "testimonials", label: "Testimonials", visible: false },
    { id: "faq", label: "FAQ", visible: true },
    { id: "gallery", label: "Gallery", visible: false },
    { id: "news", label: "News", visible: false },
    { id: "newsletter", label: "Newsletter", visible: true },
    { id: "donate", label: "Donation Details", visible: true },
    { id: "volunteer", label: "Volunteer Form", visible: true },
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
  featuredStory: {
    id: "featured-story",
    name: "A young learner",
    title: "A school kit that became a fresh start.",
    description:
      "With timely support, a child received learning materials and the encouragement to return to class with confidence.",
    imageUrl: "",
    linkLabel: "Support More Children",
    linkHref: "#donate",
  },
  testimonials: [
    {
      id: "testimonial-1",
      name: "A Vihana Volunteer",
      role: "Community volunteer",
      quote:
        "The most meaningful part is seeing a simple birthday campaign become real help for children and families.",
      imageUrl: "",
      title: "",
      description: "",
    },
    {
      id: "testimonial-2",
      name: "Supporter Family",
      role: "Birthday campaign donor",
      quote:
        "We wanted our celebration to carry kindness forward. Vihana Foundation made that possible.",
      imageUrl: "",
      title: "",
      description: "",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "How can I support Vihana Foundation?",
      answer:
        "You can dedicate a birthday, volunteer, contribute to a program or partner with us for community initiatives.",
      title: "",
      description: "",
    },
    {
      id: "faq-2",
      question: "Can I volunteer with my family?",
      answer:
        "Yes. Family-led birthday campaigns and volunteer support are central to the foundation's spirit.",
      title: "",
      description: "",
    },
  ],
  newsItems: [
    {
      id: "news-1",
      title: "Birthday kindness campaign",
      date: "2026-07-07",
      summary: "A celebration dedicated to meals, learning support and smiles.",
      description: "A celebration dedicated to meals, learning support and smiles.",
      imageUrl: "",
      linkLabel: "Read More",
      linkHref: "/about-vihana",
    },
  ],
  pages: [
    {
      id: "about-vihana",
      slug: "about-vihana",
      title: "About Vihana",
      description: "The story and spirit behind Vihana Foundation.",
      body: "Vihana Foundation was created as a family-led act of gratitude, inspired by Vihana's birthday and the belief that personal celebrations can become meaningful support for children.\n\nThe name Vihana carries the heart of the mission: to turn love, celebration and kindness into practical help for children and families. Every initiative is intended to support education, nutrition, healthcare and community care with dignity.\n\nThe foundation is still growing its public story, partnerships and verified impact records. As formal registration, tax-exemption details and annual reports become available, they will be published clearly for donor trust and transparency.",
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

function isOldPlaceholderPage(page: CmsPage) {
  return (
    page.slug === "about-vihana" &&
    page.body.trim() ===
      "Vihana Foundation was created to turn love, celebration and gratitude into practical help for children and families."
  );
}

function hasRealGallery(items: GalleryItem[]) {
  return items.some((item) => item.imageUrl);
}

function sectionShouldRender(section: SectionConfig, content: SiteContent, galleryItems: GalleryItem[]) {
  if (!section.visible) {
    return false;
  }

  if (section.id === "testimonials") {
    return content.testimonials.some((item) => Boolean(item.imageUrl || item.name || item.title) && !item.name?.includes("Vihana Volunteer") && !item.name?.includes("Supporter Family"));
  }

  if (section.id === "gallery") {
    return hasRealGallery(galleryItems);
  }

  if (section.id === "news") {
    return content.newsItems.some((item) => item.imageUrl || !item.title.toLowerCase().includes("birthday kindness campaign"));
  }

  return true;
}

export function getRenderableSections(content: SiteContent, galleryItems: GalleryItem[]) {
  return content.sectionOrder.filter((section) => sectionShouldRender(section, content, galleryItems));
}

export function mergeSiteContent(content: Partial<SiteContent> | null | undefined): SiteContent {
  const merged = {
    ...defaultSiteContent,
    ...(content || {}),
  };
  const navigationItems = arrayOrDefault(merged.navigationItems, defaultSiteContent.navigationItems);
  const socialLinks = arrayOrDefault(merged.socialLinks, defaultSiteContent.socialLinks);
  const pages = arrayOrDefault(merged.pages, defaultSiteContent.pages);
  const sectionOrder = arrayOrDefault(merged.sectionOrder, defaultSiteContent.sectionOrder);
  const navigationWithDefaults = [
    ...navigationItems,
    ...defaultSiteContent.navigationItems.filter(
      (defaultItem) => !navigationItems.some((item) => item.href === defaultItem.href)
    ),
  ];
  const pagesWithDefaults = [
    ...pages.map((page) => {
      const defaultPage = defaultSiteContent.pages.find((item) => item.slug === page.slug);

      if (defaultPage && isOldPlaceholderPage(page)) {
        return defaultPage;
      }

      return page;
    }),
    ...defaultSiteContent.pages.filter(
      (defaultPage) => !pages.some((page) => page.slug === defaultPage.slug)
    ),
  ];

  return {
    ...merged,
    navigationItems: navigationWithDefaults,
    socialLinks,
    sectionOrder: [
      ...sectionOrder,
      ...defaultSiteContent.sectionOrder.filter(
        (defaultSection) => !sectionOrder.some((section) => section.id === defaultSection.id)
      ),
    ],
    missionPillars: arrayOrDefault(merged.missionPillars, defaultSiteContent.missionPillars),
    programCards: arrayOrDefault(merged.programCards, defaultSiteContent.programCards),
    whyFeatures: arrayOrDefault(merged.whyFeatures, defaultSiteContent.whyFeatures),
    impactStats: arrayOrDefault(merged.impactStats, defaultSiteContent.impactStats),
    impactNotes: arrayOrDefault(merged.impactNotes, defaultSiteContent.impactNotes),
    volunteerActions: arrayOrDefault(merged.volunteerActions, defaultSiteContent.volunteerActions),
    featuredStory: merged.featuredStory || defaultSiteContent.featuredStory,
    testimonials: arrayOrDefault(merged.testimonials, defaultSiteContent.testimonials),
    faqs: arrayOrDefault(merged.faqs, defaultSiteContent.faqs),
    newsItems: arrayOrDefault(merged.newsItems, defaultSiteContent.newsItems),
    pages: pagesWithDefaults,
  };
}
