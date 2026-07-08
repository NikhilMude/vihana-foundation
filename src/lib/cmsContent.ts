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
  imageUrl: string;
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
  missionImageUrl: string;
  donationImageUrl: string;
  heroPrimaryLabel: string;
  heroPrimaryHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;
  heroStatValue: string;
  heroStatLabel: string;
  heroMiniTitle: string;
  heroMiniDescription: string;
  missionTitle: string;
  missionEyebrow: string;
  missionDescription: string;
  missionStoryEyebrow: string;
  missionStoryTitle: string;
  missionStoryDescription: string;
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
  donationStoryEyebrow: string;
  donationStoryTitle: string;
  donationStoryDescription: string;
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
  receiptTitle: string;
  receiptSubtitle: string;
  receiptLegalNote: string;
  receiptFooterNote: string;
  receiptSignatureName: string;
  founderStory: string;
  teamEyebrow: string;
  teamTitle: string;
  teamDescription: string;
  volunteerTitle: string;
  volunteerEyebrow: string;
  volunteerDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  footerLegalTitle: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImageUrl: string;
  floatingDonateText: string;
  floatingDonateHref: string;
  floatingDonateColor: string;
  floatingDonateTextColor: string;
  whatsappEnabled: string;
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappButtonText: string;
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
  eventsEyebrow: string;
  eventsTitle: string;
  annualReportsEyebrow: string;
  annualReportsTitle: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  emailFrom: string;
  contactNotificationEmail: string;
  volunteerNotificationEmail: string;
  donationNotificationEmail: string;
  donorNotificationEmail: string;
  contactAdminEmailSubject: string;
  contactAdminEmailBody: string;
  contactVisitorEmailSubject: string;
  contactVisitorEmailBody: string;
  donationAdminEmailSubject: string;
  donationAdminEmailBody: string;
  donationVisitorEmailSubject: string;
  donationVisitorEmailBody: string;
  donorWelcomeEmailSubject: string;
  donorWelcomeEmailBody: string;
  donorAdminEmailSubject: string;
  donorAdminEmailBody: string;
  newsletterWelcomeEmailSubject: string;
  newsletterWelcomeEmailBody: string;
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
  eventItems: EditableItem[];
  annualReports: EditableItem[];
  teamMembers: EditableItem[];
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
  brandName: "Vihana Foundation",
  brandTagline: "Small Steps. Lifelong Impact.",
  logoImageUrl: "",
  heroBadge: "Founded in honor of Vihana",
  heroTitle: "Every Birthday.",
  heroHighlight: "A Thousand Smiles.",
  heroDescription:
    "Vihana Foundation turns celebrations into meaningful care for children through learning support, nourishing meals, health access and community-led kindness.",
  heroImageUrl: "/images/generated/vihana-hero-photo.jpg",
  missionImageUrl: "/images/generated/vihana-meal-support-photo.jpg",
  donationImageUrl: "/images/generated/vihana-meal-support-photo.jpg",
  heroPrimaryLabel: "Join the Movement",
  heroPrimaryHref: "#volunteer",
  heroSecondaryLabel: "Our Story",
  heroSecondaryHref: "#mission",
  heroStatValue: "10K+",
  heroStatLabel: "Meals shared",
  heroMiniTitle: "Birthday to impact",
  heroMiniDescription: "A simple celebration can become food, care and confidence.",
  missionTitle: "Turning personal celebration into public good.",
  missionEyebrow: "Our Mission",
  missionDescription:
    "Vihana Foundation was created from a simple belief: joy becomes more powerful when it is shared. Each initiative helps children feel seen, supported and ready to build a brighter future.",
  missionStoryEyebrow: "From celebration to care",
  missionStoryTitle: "A birthday can become books, meals, care and confidence.",
  missionStoryDescription:
    "This is the heart of Vihana Foundation: turning family joy into practical support that children can feel in their everyday lives.",
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
    "Photos and stories from learning support, meal drives, health awareness and birthday campaigns.",
  donateTitle: "Give with clarity and confidence.",
  donateEyebrow: "Donate",
  donateDescription:
    "Support children through education, nutrition, health awareness and community-led care. Please verify official payment and receipt details before making a contribution.",
  donationStoryEyebrow: "Active giving moment",
  donationStoryTitle: "Your support can become a meal, a notebook, or a reason to return to class.",
  donationStoryDescription:
    "Every contribution is recorded with care so the foundation can verify payments, prepare acknowledgements and keep transparent internal records.",
  upiId: "",
  bankAccountName: "",
  bankAccountNumber: "",
  bankIfsc: "",
  bankName: "",
  legalStatusNote: "Foundation registration, trust deed and tax-exemption details will be published here after formal verification.",
  registrationNumber: "",
  panNumber: "",
  taxExemptionNote: "80G/12A details will be updated after verification.",
  annualReportHref: "",
  receiptTitle: "Donation Receipt",
  receiptSubtitle: "Acknowledgement for your contribution",
  receiptLegalNote:
    "This acknowledgement is generated from website records. Official tax receipt eligibility depends on verified payment, final registration details and applicable compliance requirements.",
  receiptFooterNote: "Thank you for supporting Vihana Foundation.",
  receiptSignatureName: "Vihana Foundation",
  founderStory:
    "Vihana Foundation was created as a family-led act of gratitude, inspired by Vihana's birthday and the belief that personal celebrations can become meaningful support for children. The foundation is being shaped to support education, nutrition, healthcare and community care with transparency, dignity and warmth.",
  teamEyebrow: "People Behind Vihana",
  teamTitle: "The Team",
  teamDescription:
    "A growing circle of family members, volunteers and advisors helping shape Vihana Foundation with care, discipline and transparency.",
  volunteerTitle: "Help make Vihana's birthday a reason for many children to smile.",
  volunteerEyebrow: "Volunteer",
  volunteerDescription:
    "Start with one act: sponsor a meal, contribute school supplies, volunteer at a drive or build a birthday campaign with your family.",
  contactEmail: "contact@vihanafoundation.org",
  contactPhone: "+91 98765 43210",
  contactLocation: "India",
  footerLegalTitle: "Legal",
  metaTitle: "Vihana Foundation | Small Steps. Lifelong Impact.",
  metaDescription:
    "Vihana Foundation turns celebrations into education, nutrition, healthcare and community support for children and families.",
  metaKeywords: "Vihana Foundation, charity, NGO, children, education, nutrition, healthcare, birthday campaign",
  ogImageUrl: "/images/generated/vihana-hero-photo.jpg",
  floatingDonateText: "Donate",
  floatingDonateHref: "#donate",
  floatingDonateColor: "#0f766e",
  floatingDonateTextColor: "#ffffff",
  whatsappEnabled: "true",
  whatsappNumber: "",
  whatsappMessage: "Hello Vihana Foundation, I would like to know more.",
  whatsappButtonText: "WhatsApp",
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
  eventsEyebrow: "Events",
  eventsTitle: "Upcoming drives and community moments.",
  annualReportsEyebrow: "Transparency",
  annualReportsTitle: "Annual reports and public documents.",
  newsletterHeading: "Stay connected with Vihana Foundation.",
  newsletterDescription:
    "Receive updates about campaigns, volunteer opportunities and stories of impact.",
  newsletterPlaceholder: "Email address",
  newsletterButtonText: "Subscribe",
  emailFrom: "Vihana Foundation <support@vihanafoundation.org>",
  contactNotificationEmail: "contact@vihanafoundation.org",
  volunteerNotificationEmail: "volunteer@vihanafoundation.org",
  donationNotificationEmail: "donate@vihanafoundation.org",
  donorNotificationEmail: "support@vihanafoundation.org",
  contactAdminEmailSubject: "New {{interest}} enquiry from {{name}}",
  contactAdminEmailBody:
    "New website enquiry received.\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nInterest: {{interest}}\n\nMessage:\n{{message}}\n\nSubmitted at: {{createdAt}}",
  contactVisitorEmailSubject: "We received your message - Vihana Foundation",
  contactVisitorEmailBody:
    "Dear {{name}},\n\nThank you for reaching out to Vihana Foundation. We received your message and will review it soon.\n\nYour interest: {{interest}}\n\nYour message:\n{{message}}\n\nWith gratitude,\nVihana Foundation",
  donationAdminEmailSubject: "New donation intent from {{name}}",
  donationAdminEmailBody:
    "A donation intent was submitted.\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nAmount: INR {{amount}}\nFrequency: {{frequency}}\nPurpose: {{purpose}}\nMethod: {{method}}\nReference: {{transactionId}}\nReceipt required: {{receiptRequired}}\nReceipt number: {{receiptNumber}}\nReceipt status: {{receiptStatus}}\nPAN: {{pan}}\nAddress: {{address}}\n\nMessage:\n{{message}}\n\nSubmitted at: {{createdAt}}",
  donationVisitorEmailSubject: "Thank you for supporting Vihana Foundation",
  donationVisitorEmailBody:
    "Dear {{name}},\n\nThank you for supporting Vihana Foundation.\n\nWe received your {{frequency}} donation intent for INR {{amount}} toward {{purpose}}.\n\nReceipt number: {{receiptNumber}}\nReceipt status: {{receiptStatus}}\nIssued at: {{receiptIssuedAt}}\n\nDownload PDF receipt: {{receiptDownloadUrl}}\n\nPayment method: {{method}}\nTransaction/reference: {{transactionId}}\n\nThis is a provisional acknowledgement until verified payment integration and official receipts are configured.\n\nWith gratitude,\nVihana Foundation",
  donorWelcomeEmailSubject: "Your Vihana Foundation donor account is ready",
  donorWelcomeEmailBody:
    "Dear {{name}},\n\nYour Vihana Foundation donor account has been created successfully.\n\nYou can use it to keep donation history and receipt information in one place.\n\nWith gratitude,\nVihana Foundation",
  donorAdminEmailSubject: "New donor account created - {{name}}",
  donorAdminEmailBody:
    "A donor account was created.\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nDonor type: {{donorType}}\nPAN: {{pan}}\nAddress: {{address}}\n\nCreated at: {{createdAt}}",
  newsletterWelcomeEmailSubject: "You are subscribed to Vihana Foundation updates",
  newsletterWelcomeEmailBody:
    "Thank you for subscribing to Vihana Foundation updates.\n\nWe will share meaningful updates about campaigns, volunteer opportunities and stories of impact.",
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
    { label: "Donor Login", href: "/donor" },
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
    { id: "gallery", label: "Gallery", visible: true },
    { id: "events", label: "Events", visible: true },
    { id: "news", label: "News", visible: false },
    { id: "annualReports", label: "Annual Reports", visible: true },
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
      imageUrl: "/images/generated/vihana-story-photo.jpg",
      linkLabel: "Support this program",
      linkHref: "#volunteer",
    },
    {
      id: "food",
      title: "Food and Nutrition",
      description: "Meal drives, ration support and nutrition-focused outreach for children and families.",
      imageUrl: "/images/generated/vihana-meal-support-photo.jpg",
      linkLabel: "Support this program",
      linkHref: "#volunteer",
    },
    {
      id: "health",
      title: "Health and Wellness",
      description: "Medical camps, wellness awareness and preventive care through trusted local partners.",
      imageUrl: "/images/generated/vihana-hero-photo.jpg",
      linkLabel: "Support this program",
      linkHref: "#volunteer",
    },
    {
      id: "community",
      title: "Community and Environment",
      description: "Clean surroundings, tree plantation and civic initiatives that strengthen neighborhoods.",
      imageUrl: "/images/generated/vihana-meal-support-photo.jpg",
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
    imageUrl: "/images/generated/vihana-story-photo.jpg",
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
      imageUrl: "/images/generated/vihana-meal-support-photo.jpg",
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
      imageUrl: "/images/generated/vihana-hero-photo.jpg",
      linkLabel: "Read More",
      linkHref: "/about-vihana",
    },
  ],
  eventItems: [
    {
      id: "event-1",
      title: "Birthday Kindness Drive",
      value: "Monthly campaign",
      description: "A family-led giving drive for school kits, nutritious meals and volunteer participation.",
      imageUrl: "/images/generated/vihana-meal-support-photo.jpg",
      tag: "Community outreach",
      linkLabel: "Register Interest",
      linkHref: "#volunteer",
    },
    {
      id: "event-school-kits",
      title: "School Kit Support Day",
      value: "Planning stage",
      description: "A focused drive to prepare notebooks, stationery and learning essentials for children.",
      imageUrl: "/images/generated/vihana-story-photo.jpg",
      tag: "Education support",
      linkLabel: "Volunteer",
      linkHref: "#volunteer",
    },
    {
      id: "event-meal-support",
      title: "Nourishing Meals Outreach",
      value: "To be scheduled",
      description: "A meal support activity designed with local partners and volunteers for children and families.",
      imageUrl: "/images/generated/vihana-meal-support-photo.jpg",
      tag: "Nutrition",
      linkLabel: "Support This",
      linkHref: "#donate",
    },
    {
      id: "event-health-awareness",
      title: "Health Awareness Camp",
      value: "Partner outreach",
      description: "A planned wellness session covering basic health awareness, hygiene and family support resources.",
      imageUrl: "/images/generated/vihana-hero-photo.jpg",
      tag: "Health and wellness",
      linkLabel: "Partner With Us",
      linkHref: "#volunteer",
    },
  ],
  annualReports: [
    {
      id: "annual-report-1",
      title: "Public Documents",
      value: "To be updated",
      description: "Registration documents, annual reports, audited statements and compliance records will be published here after verification.",
      linkLabel: "View Document",
      linkHref: "",
    },
  ],
  teamMembers: [
    {
      id: "team-founder",
      name: "Nikhil Mude",
      title: "Nikhil Mude",
      role: "Founder",
      tag: "Superpowers: Compassion, Operations, Community Building",
      description:
        "Founded Vihana Foundation in honor of Vihana\nFocused on transparent giving and practical community support\nBuilding programs around education, nutrition and health access",
      imageUrl: "",
    },
    {
      id: "team-volunteer",
      name: "Vihana Foundation Volunteer",
      title: "Vihana Foundation Volunteer",
      role: "Community Support",
      tag: "Superpowers: Empathy, Reliability, Local Coordination",
      description:
        "Supports outreach and volunteer coordination\nHelps organize drives, supplies and follow-ups\nKeeps every program grounded in dignity and care",
      imageUrl: "",
    },
    {
      id: "team-advisor",
      name: "Program Advisor",
      title: "Program Advisor",
      role: "Advisor",
      tag: "Superpowers: Planning, Partnerships, Impact Tracking",
      description:
        "Guides program planning and campaign structure\nSupports partnerships with schools and local groups\nHelps improve reporting and accountability",
      imageUrl: "",
    },
  ],
  pages: [
    {
      id: "about-vihana",
      slug: "about-vihana",
      title: "About Vihana",
      description:
        "The story, values and birthday-inspired promise behind Vihana Foundation.",
      imageUrl: "/images/generated/vihana-hero-photo.jpg",
      body:
        "Vihana Foundation was created in honor of Vihana's birthday, with a simple belief at its heart: a family celebration can become a source of care, dignity and opportunity for many children.\n\nThe name Vihana represents light, hope and a new beginning. The foundation carries that spirit into practical community work by supporting children's education, nutrition, health awareness and everyday wellbeing.\n\nOur work is intentionally simple and grounded. We want to help children stay connected to learning, receive nourishing meals, access basic health support and feel seen by a community that cares about their future.\n\nWe focus on practical support that families can understand and communities can trust: school supplies, learning support, meal drives, health awareness, birthday campaigns and volunteer-led outreach.\n\nTransparency is part of how Vihana Foundation is being built. Registration details, tax-exemption information, annual reports, public documents and verified impact updates will be published clearly as they become available.\n\nThe foundation is family-led, volunteer-supported and guided by a promise to treat every child, donor, volunteer and partner with dignity, honesty and care.",
      buttonLabel: "Join the Movement",
      buttonHref: "/#volunteer",
      published: true,
    },
    {
      id: "contact-us",
      slug: "contact-us",
      title: "Contact Us",
      description: "Reach Vihana Foundation for volunteering, donations, partnerships and birthday campaigns.",
      imageUrl: "/images/generated/vihana-meal-support-photo.jpg",
      body:
        "We would love to hear from you if you want to volunteer, donate, partner with us, organize a birthday campaign or support a local community initiative.\n\nFor general queries, write to contact@vihanafoundation.org. For donation-related questions, write to donate@vihanafoundation.org. For volunteering, write to volunteer@vihanafoundation.org. For foundation support or records, write to support@vihanafoundation.org or info@vihanafoundation.org.\n\nYou can also use the volunteer form on the homepage. Your message will be saved securely in the CMS so the foundation team can review and respond from one place.\n\nPlease include your name, city, preferred contact method and the type of support you are interested in. This helps us respond with the right next step.",
      buttonLabel: "Send A Message",
      buttonHref: "/#volunteer",
      published: true,
    },
    {
      id: "privacy-policy",
      slug: "privacy-policy",
      title: "Privacy Policy",
      description: "How Vihana Foundation collects, uses and protects website visitor, donor, volunteer and subscriber information.",
      imageUrl: "/images/generated/vihana-story-photo.jpg",
      body:
        "Last updated: July 2026\n\nVihana Foundation respects the privacy of visitors, donors, volunteers, subscribers, partners and community members who interact with this website.\n\nInformation we collect\n\nWe may collect information that you choose to share with us, including your name, email address, phone number, city, message, volunteer interests, donation intent details, donor account information, PAN/address details shared for receipt records, newsletter subscription details and files or references submitted through forms.\n\nWe may also collect limited technical information such as page visits, device type, browser type, approximate location, referral source, form activity and security logs. This helps us improve website performance, prevent misuse and understand how visitors use the site.\n\nHow we use information\n\nWe use information to respond to enquiries, coordinate volunteers, process donor account requests, maintain donation and receipt records, send requested newsletters or updates, improve the website, prepare internal reports, support transparency, protect the website from misuse and meet legal, accounting, audit or compliance requirements.\n\nDonation and receipt records\n\nDonation details submitted through the website may be stored for accounting, donor communication, receipt preparation, verification and audit purposes. PAN, address and payment reference details should be provided only when required for receipt or compliance records.\n\nNewsletter communication\n\nIf you subscribe to our newsletter, we may send updates about campaigns, events, impact stories and foundation announcements. You may request removal from the mailing list by contacting us.\n\nSharing of information\n\nWe do not sell personal information. We may share limited information with trusted service providers who help with website hosting, database storage, email delivery, analytics, form handling, payment communication, accounting, legal compliance or security. We may also disclose information if required by law, regulation, court order, audit, fraud prevention or public authority request.\n\nData security and retention\n\nWe use reasonable administrative and technical measures to protect information. No internet-based system can be guaranteed to be completely secure. Records may be retained for as long as needed for donor communication, accounting, legal, audit, security, tax, reporting or operational purposes.\n\nYour choices\n\nYou may request access, correction or deletion of personal information by writing to contact@vihanafoundation.org. Some records may need to be retained where required for legal, accounting, audit, tax, security or dispute-resolution reasons.\n\nChildren's privacy\n\nThe website is intended for adults who wish to support or learn about the foundation. We do not knowingly request sensitive personal information from children through this website. Photos, stories and beneficiary information should be used only with appropriate consent and dignity.\n\nContact\n\nFor privacy questions, corrections or removal requests, contact contact@vihanafoundation.org.",
      buttonLabel: "Contact Us",
      buttonHref: "/contact-us",
      published: true,
    },
    {
      id: "terms-and-conditions",
      slug: "terms-and-conditions",
      title: "Terms & Conditions",
      description: "Terms for using the Vihana Foundation website, content, forms, donation information and communications.",
      imageUrl: "/images/generated/vihana-hero-photo.jpg",
      body:
        "Last updated: July 2026\n\nThese Terms & Conditions govern use of the Vihana Foundation website, forms, donor account features, newsletter features, donation information and public content.\n\nUse of the website\n\nYou agree to use this website only for lawful, honest and responsible purposes. You must not attempt unauthorized access, interfere with the website, submit false or misleading information, misuse forms, upload harmful content or use Vihana Foundation's name, logo, photos or materials in a misleading way.\n\nWebsite content\n\nContent on this website is provided for general information about Vihana Foundation, its values, programs, campaigns, volunteering opportunities, donation information and community initiatives. Content may be updated, corrected, removed or replaced as programs and records evolve.\n\nDonations and donor records\n\nDonation forms on the website may collect pledge, payment reference and receipt information. A website submission does not by itself confirm that funds have been received, verified or accepted. Donation confirmation, accounting treatment, official receipts and tax-related documents depend on payment verification, internal records, applicable law and the foundation's final compliance setup.\n\nDonor accounts\n\nDonor accounts are provided to help donors view submitted donation records, download available acknowledgement documents and maintain basic receipt information. Donors are responsible for keeping login details confidential and for providing accurate information.\n\nVolunteering and partnerships\n\nSubmitting a volunteer, contact or partnership form does not create an employment relationship, confirmed volunteer appointment, agency relationship, partnership agreement or obligation on either side. The foundation team may contact you separately if an opportunity is suitable.\n\nNewsletter and communications\n\nBy subscribing or submitting forms, you agree that Vihana Foundation may contact you regarding your enquiry, subscription, donation record, volunteer interest or related foundation updates. You may request removal from non-essential mailing lists.\n\nIntellectual property\n\nWebsite text, design, logo, images, graphics and other materials belong to Vihana Foundation or are used under license, consent, ownership or permitted representative use. You may not copy, reproduce, alter or use them for commercial, misleading or unauthorized purposes.\n\nThird-party services\n\nThe website may link to payment providers, email tools, maps, social platforms, analytics tools, embedded content or other third-party services. Vihana Foundation is not responsible for the policies, content, security or practices of third-party websites or services.\n\nLimitation of responsibility\n\nWe make reasonable efforts to keep website information accurate, but we do not guarantee that all content is complete, current or error-free at all times. To the maximum extent permitted by law, Vihana Foundation is not liable for losses arising from website use, temporary unavailability, third-party services or reliance on unverified information.\n\nChanges to these terms\n\nThese terms may be updated from time to time. Continued use of the website after updates means you accept the revised terms.\n\nContact\n\nFor questions about these terms, contact contact@vihanafoundation.org.",
      buttonLabel: "Contact Us",
      buttonHref: "/contact-us",
      published: true,
    },
    {
      id: "cookie-policy",
      slug: "cookie-policy",
      title: "Cookie Policy",
      description: "How cookies, analytics and similar website technologies may be used on the Vihana Foundation website.",
      imageUrl: "/images/generated/vihana-story-photo.jpg",
      body:
        "Last updated: July 2026\n\nThis Cookie Policy explains how Vihana Foundation uses cookies and similar technologies on this website.\n\nWhat cookies are\n\nCookies are small files stored on a visitor's device. Similar technologies may include local storage, pixels, tags or server logs. These tools help websites function, remember choices and understand basic usage.\n\nTypes of cookies we may use\n\nEssential cookies are used for core website functions such as security, cookie consent choices, admin login, donor login, form submission and session protection. These cookies are necessary for the website to work reliably.\n\nPreference cookies may remember choices such as cookie settings or saved website preferences.\n\nAnalytics cookies may help us understand page visits, device type, browser type, approximate location, referral source and website performance. Analytics information helps improve content, accessibility and navigation.\n\nThird-party cookies may be set by services used for hosting, email delivery, form handling, database services, analytics, payment communication, embedded content, maps, media, social links or security tools. These providers manage their cookies according to their own policies.\n\nCookie consent choices\n\nVisitors can choose Accept All, Essential Only or Reject All through the cookie banner. Essential cookies may still be used because they are needed for the site to function. Your choice may be saved in your browser so the banner does not appear on every visit.\n\nManaging cookies\n\nYou can also block, delete or manage cookies through your browser settings. Blocking cookies may affect login, form submission, saved preferences, embedded content, analytics accuracy or other site features.\n\nNo sale of information\n\nWe do not use cookies to sell visitor information. If advertising, remarketing or additional tracking tools are added later, this policy should be updated before those tools are enabled.\n\nChanges to this policy\n\nThis Cookie Policy may be updated when website tools, analytics, payment systems or third-party services change.\n\nContact\n\nFor cookie or privacy questions, contact contact@vihanafoundation.org.",
      buttonLabel: "Contact Us",
      buttonHref: "/contact-us",
      published: true,
    },
    {
      id: "disclaimer",
      slug: "disclaimer",
      title: "Disclaimer",
      description: "Important disclaimers about website content, program updates, donation information and legal/tax details.",
      imageUrl: "/images/generated/vihana-meal-support-photo.jpg",
      body:
        "Last updated: July 2026\n\nThe information on this website is provided in good faith for general awareness about Vihana Foundation, its values, programs, campaigns and community initiatives.\n\nAccuracy of information\n\nWe aim to keep website information accurate and updated. Program details, campaign dates, impact numbers, photos, donation details, legal information and tax-related notes may change as records are verified and updated.\n\nNo professional advice\n\nNothing on this website should be treated as legal, tax, medical, financial, accounting or other professional advice. Donors, volunteers and partners should seek independent advice where needed.\n\nDonation and tax information\n\nDonation acknowledgements, official receipts and tax benefits depend on verified payment, foundation records, applicable law and the foundation's final registration and compliance status. Donors should verify payment details and tax eligibility before making a contribution.\n\nImages and stories\n\nSome images may be real program photos, representative photos or generated visual material while final field photos and consent-based materials are being prepared. Beneficiary photos and stories should always be used with dignity, permission and care.\n\nExternal links\n\nThe website may include links to third-party websites or services. Vihana Foundation is not responsible for third-party content, security, privacy practices, payment systems or service availability.\n\nAvailability\n\nWe try to keep the website available and secure, but we cannot guarantee uninterrupted access, error-free operation or complete protection from all technical issues.\n\nTransparency commitment\n\nVihana Foundation is committed to improving transparency as formal documents, verified impact data, annual reports, financial summaries and compliance records become available.\n\nContact\n\nFor corrections or questions about website information, contact contact@vihanafoundation.org.",
      buttonLabel: "Contact Us",
      buttonHref: "/contact-us",
      published: true,
    },
    {
      id: "refund-cancellation-policy",
      slug: "refund-cancellation-policy",
      title: "Refund & Cancellation Policy",
      description: "How donation refund or cancellation requests may be handled by Vihana Foundation.",
      imageUrl: "/images/generated/vihana-meal-support-photo.jpg",
      body:
        "Last updated: July 2026\n\nThis Refund & Cancellation Policy explains how Vihana Foundation may handle donation-related refund or cancellation requests.\n\nVoluntary donations\n\nDonations are voluntary contributions made to support charitable and community initiatives. Once a donation is received and allocated, refunds may not always be possible.\n\nWhen refund requests may be reviewed\n\nRefund requests may be reviewed case by case in situations such as duplicate payment, incorrect amount, failed transaction, mistaken transfer, unauthorized payment, technical error or a payment made to an incorrect account.\n\nHow to request a refund review\n\nTo request a review, email donate@vihanafoundation.org with the donor name, email, phone number, payment date, amount, payment method, transaction/reference ID, bank or UPI details where relevant and the reason for the request. Requests should be made as soon as possible after the transaction.\n\nVerification process\n\nThe foundation team may verify the request against payment records, bank/UPI details, donation intent records, donor communication, issued receipt records and accounting entries. Additional information may be requested before a decision is made.\n\nApproved refunds\n\nApproved refunds, if any, may be returned to the original payment method or verified bank account after internal approval. Processing timelines may depend on the bank, payment provider, accounting review and operational availability.\n\nReceipts and tax records\n\nIf an acknowledgement, official receipt or tax-related document has already been issued, refund processing may require cancellation, correction or adjustment of those records before the refund can be completed.\n\nNon-refundable situations\n\nRefunds may be declined where payment cannot be verified, the request is incomplete, the claim appears fraudulent, funds have already been used for the intended charitable purpose, or refunding would conflict with legal, accounting or compliance requirements.\n\nCancellation of recurring support\n\nIf recurring or monthly donation functionality is enabled in the future, donors may request cancellation according to the payment provider's process and foundation records. Cancellation stops future payments; it does not automatically refund past donations.\n\nContact\n\nFor donation refund or cancellation questions, contact donate@vihanafoundation.org.",
      buttonLabel: "Contact Us",
      buttonHref: "/contact-us",
      published: true,
    },
  ],
};

export const defaultGalleryItems: GalleryItem[] = [
  {
    id: "meal-drives",
    title: "Meal Drives",
    description: "Fresh, nourishing food shared with children and families.",
    imageUrl: "/images/generated/vihana-meal-support-photo.jpg",
    tag: "Nutrition",
  },
  {
    id: "school-support",
    title: "School Support",
    description: "Kits, supplies and mentoring that make learning easier.",
    imageUrl: "/images/generated/vihana-story-photo.jpg",
    tag: "Education",
  },
  {
    id: "health-camps",
    title: "Health Camps",
    description: "Preventive care and wellness awareness in local communities.",
    imageUrl: "/images/generated/vihana-hero-photo.jpg",
    tag: "Health",
  },
];

function arrayOrDefault<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function eventItemsOrDefault(value: unknown) {
  const items = arrayOrDefault(value, defaultSiteContent.eventItems);

  if (
    items.length === 1 &&
    items[0]?.id === "event-1" &&
    items[0]?.title === "Birthday Kindness Drive" &&
    items[0]?.value === "To be announced"
  ) {
    return defaultSiteContent.eventItems;
  }

  return items;
}

function isOldPlaceholderPage(page: CmsPage) {
  const oldDraftFragments = [
    "Vihana Foundation was created to turn love, celebration and gratitude into practical help",
    "The foundation is still growing its public story",
    "We would love to hear from you.",
    "This page should be reviewed by a qualified legal advisor before public launch.",
    "This page should be reviewed by a qualified legal advisor before accepting public donations.",
    "This Privacy Policy explains how Vihana Foundation may collect, use and protect information shared through this website.",
    "This is a draft policy for launch preparation.",
    "This is a draft terms page for launch preparation.",
    "This Cookie Policy explains how Vihana Foundation's website may use cookies and similar technologies.",
    "This Refund & Cancellation Policy applies to donation-related transactions where applicable.",
  ];

  return oldDraftFragments.some((fragment) => page.body.includes(fragment));
}

function mergePageWithDefault(page: CmsPage): CmsPage {
  const defaultPage = defaultSiteContent.pages.find((item) => item.slug === page.slug);

  if (!defaultPage) {
    return {
      ...page,
      imageUrl: page.imageUrl || "",
    };
  }

  if (isOldPlaceholderPage(page)) {
    return defaultPage;
  }

  return (
    {
      ...page,
      imageUrl: page.imageUrl || defaultPage.imageUrl,
    }
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

  if (section.id === "events") {
    return content.eventItems.some((item) => item.title);
  }

  if (section.id === "annualReports") {
    return content.annualReports.some((item) => item.title);
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
  const sanitizedPaymentFields = {
    upiId: merged.upiId === "test-vihana@upi" ? "" : merged.upiId,
    bankAccountName: merged.bankAccountName === "Vihana Foundation Test" ? "" : merged.bankAccountName,
    bankAccountNumber: merged.bankAccountNumber === "000000000000" ? "" : merged.bankAccountNumber,
    bankIfsc: merged.bankIfsc === "TEST0001234" ? "" : merged.bankIfsc,
    bankName: merged.bankName === "Test Bank" ? "" : merged.bankName,
  };
  const sanitizedBrandFields = {
    brandName: merged.brandName === "Vihana" ? "Vihana Foundation" : merged.brandName,
    brandTagline: merged.brandTagline === "Foundation" ? "Small Steps. Lifelong Impact." : merged.brandTagline,
    metaTitle:
      merged.metaTitle === "Vihana Foundation | Every Birthday. A Thousand Smiles."
        ? "Vihana Foundation | Small Steps. Lifelong Impact."
        : merged.metaTitle,
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
    ...pages.map((page) => mergePageWithDefault(page)),
    ...defaultSiteContent.pages.filter(
      (defaultPage) => !pages.some((page) => page.slug === defaultPage.slug)
    ),
  ];

  return {
    ...merged,
    ...sanitizedPaymentFields,
    ...sanitizedBrandFields,
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
    eventItems: eventItemsOrDefault(merged.eventItems),
    annualReports: arrayOrDefault(merged.annualReports, defaultSiteContent.annualReports),
    teamMembers: arrayOrDefault(merged.teamMembers, defaultSiteContent.teamMembers),
    pages: pagesWithDefaults,
  };
}
