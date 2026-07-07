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
  founderStory: string;
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
    "The gallery will grow with real photos from drives, school outreach, health camps and birthday campaigns.",
  donateTitle: "Give with clarity and confidence.",
  donateEyebrow: "Donate",
  donateDescription:
    "Donation information is ready as a website section. Replace the placeholders with your verified charity payment details before accepting public donations.",
  donationStoryEyebrow: "Active giving moment",
  donationStoryTitle: "Your support can become a meal, a notebook, or a reason to return to class.",
  donationStoryDescription:
    "Use this section for your current campaign. Add a real drive photo later from the CMS to make the appeal more trustworthy and personal.",
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
  contactEmail: "contact@vihanafoundation.org",
  contactPhone: "+91 98765 43210",
  contactLocation: "India",
  footerLegalTitle: "Legal",
  metaTitle: "Vihana Foundation | Every Birthday. A Thousand Smiles.",
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
    "A donation intent was submitted.\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nAmount: INR {{amount}}\nFrequency: {{frequency}}\nPurpose: {{purpose}}\nMethod: {{method}}\nReference: {{transactionId}}\nReceipt required: {{receiptRequired}}\nPAN: {{pan}}\nAddress: {{address}}\n\nMessage:\n{{message}}\n\nSubmitted at: {{createdAt}}",
  donationVisitorEmailSubject: "Thank you for supporting Vihana Foundation",
  donationVisitorEmailBody:
    "Dear {{name}},\n\nThank you for supporting Vihana Foundation.\n\nWe received your {{frequency}} donation intent for INR {{amount}} toward {{purpose}}.\n\nPayment method: {{method}}\nTransaction/reference: {{transactionId}}\n\nThis is a test-mode acknowledgement until verified payment integration and official receipts are configured.\n\nWith gratitude,\nVihana Foundation",
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
      value: "To be announced",
      description: "A community campaign for school kits, nutritious meals and volunteer participation.",
      imageUrl: "/images/generated/vihana-meal-support-photo.jpg",
      linkLabel: "Register Interest",
      linkHref: "#volunteer",
    },
  ],
  annualReports: [
    {
      id: "annual-report-1",
      title: "Annual Report",
      value: "Coming soon",
      description: "Verified reports and public documents will be published here as they become available.",
      linkLabel: "View Document",
      linkHref: "",
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
        "Vihana Foundation was created in honor of Vihana's birthday, with a simple belief at its heart: a family celebration can become a source of care, dignity and opportunity for many children.\n\nThe name Vihana represents light, hope and a new beginning. The foundation carries that spirit into practical community work by supporting children's education, nutrition, health awareness and everyday wellbeing.\n\nOur early focus is intentionally simple and grounded. We want to help children stay connected to learning, receive nourishing meals, access basic health support and feel seen by a community that cares about their future.\n\nVihana Foundation is being built with transparency as a core value. Verified registration details, tax-exemption information, annual reports and audited public documents will be published clearly as they are finalized.\n\nUntil our real field photos and complete foundation documents are ready, this website uses carefully selected placeholder content so the structure is prepared for launch. Every line, image and page can be updated from the CMS by the admin team.",
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
        "This Privacy Policy explains how Vihana Foundation may collect, use and protect information shared through this website.\n\nInformation we may collect includes names, email addresses, phone numbers, city details, volunteer interests, donation intent details, newsletter subscriptions, website visit information and messages submitted through forms.\n\nWe use this information to respond to enquiries, coordinate volunteers, maintain donation and campaign records, send newsletters to subscribers, improve the website and meet operational, transparency or compliance needs.\n\nWe do not sell personal information. Information may be shared only with trusted service providers used for hosting, email delivery, analytics, form storage, recordkeeping or payment communication, or when required by law.\n\nVisitors may request correction or deletion of personal information by contacting contact@vihanafoundation.org. Some records may need to be retained for legal, accounting, security or audit reasons.\n\nThis is a draft policy for launch preparation. Please have it reviewed by a qualified legal advisor before accepting public donations or publishing final compliance statements.",
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
        "By using this website, you agree to use it responsibly, honestly and only for lawful purposes.\n\nWebsite content is provided for general information about Vihana Foundation, its programs, campaigns, volunteering opportunities, donation information and community initiatives. Content may be updated, corrected or removed as records and programs evolve.\n\nSubmitting a contact form, volunteer form, donation form or newsletter signup does not automatically create a confirmed partnership, employment relationship, volunteer appointment, donation receipt or tax benefit. Confirmation will be shared separately by the foundation team where applicable.\n\nDonation details shown on the website should be verified before making any payment. Receipts, acknowledgements and tax benefits depend on the foundation's verified registration status, payment confirmation and applicable law.\n\nUsers must not misuse the website, attempt unauthorized access, copy content in a misleading way, submit false information or use Vihana Foundation's name, photos or materials without permission.\n\nThis is a draft terms page for launch preparation. Please have it reviewed by a qualified legal advisor before public launch.",
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
        "This Cookie Policy explains how Vihana Foundation's website may use cookies and similar technologies.\n\nCookies may help the website remember preferences, understand visitor activity, improve performance, protect forms from misuse and support analytics or email tools.\n\nThe website may also use services such as hosting, analytics, email delivery, form processing or embedded media. These services may place their own cookies according to their own policies.\n\nVisitors can usually manage or block cookies through browser settings. Blocking cookies may affect some website features, including analytics, forms, embedded content or saved preferences.\n\nIf Vihana Foundation adds additional analytics, advertising, remarketing or third-party tools in the future, this policy should be updated with the names and purposes of those tools.\n\nThis is a draft cookie policy for launch preparation. Please review it before public launch.",
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
        "The information on this website is provided in good faith for general awareness about Vihana Foundation, its values, programs and community initiatives.\n\nProgram details, impact numbers, photos, campaign dates, legal information, donation details and tax-related notes may change as records are verified and updated.\n\nNothing on this website should be treated as legal, tax, medical, financial or professional advice. Donors should verify payment details, registration information and tax eligibility before making any contribution.\n\nPhotos currently used on parts of the website may be placeholder or representative images until real program photos are available with proper consent. Real beneficiary photos should always be used responsibly and with dignity.\n\nVihana Foundation is committed to improving transparency as formal documents, reports and verified impact data become available.\n\nThis disclaimer should be reviewed by a qualified legal advisor before public launch.",
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
        "This Refund & Cancellation Policy applies to donation-related transactions where applicable.\n\nDonations are generally voluntary contributions toward charitable activities. Refund requests may be reviewed case by case, especially in situations such as duplicate payment, incorrect amount, failed transaction, mistaken transfer or unauthorized payment.\n\nTo request a refund review, contact donate@vihanafoundation.org with the donor name, contact details, payment date, amount, payment method and transaction reference. Clear supporting details help the team verify the request faster.\n\nApproved refunds, if any, may be returned to the original payment method or bank account after verification. Processing timelines depend on the payment provider, bank and internal record review.\n\nIf an official donation receipt or tax document has already been issued, refund processing may require cancellation or correction of those records before the refund can be completed.\n\nThis is a draft policy for launch preparation. Please have it reviewed by a qualified legal advisor before accepting public donations.",
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

function isOldPlaceholderPage(page: CmsPage) {
  const oldDraftFragments = [
    "Vihana Foundation was created to turn love, celebration and gratitude into practical help",
    "The foundation is still growing its public story",
    "We would love to hear from you.",
    "This page should be reviewed by a qualified legal advisor before public launch.",
    "This page should be reviewed by a qualified legal advisor before accepting public donations.",
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
    eventItems: arrayOrDefault(merged.eventItems, defaultSiteContent.eventItems),
    annualReports: arrayOrDefault(merged.annualReports, defaultSiteContent.annualReports),
    pages: pagesWithDefaults,
  };
}
