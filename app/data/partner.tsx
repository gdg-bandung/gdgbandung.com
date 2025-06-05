import {
  Award,
  Globe,
  Heart,
  Lightbulb,
  Megaphone,
  MessageSquare,
  Target,
  Users,
  Zap,
} from "lucide-react";

export const PARTNER_DATA = [
  {
    url: "https://t.me/bandungdevcom",
    imageUrl: "/partnership/bandung-dev.webp",
  },
  {
    url: "https://t.me/androidDevBdg",
    imageUrl: "/partnership/adb.webp",
  },
  {
    url: "https://binarynusantara.com",
    imageUrl: "/partnership/binary-nusantara.webp",
  },
  {
    url: "https://gdg.community.dev/gdg-cloud-bandung/",
    imageUrl: "/partnership/gdg-cloud-bandung.svg",
  },
];

export const WHY_PARTNER = [
  {
    icon: <Target className="h-6 w-6 text-gdg-blue" />,
    title: "Reach Potential Developers",
    description: (
      <>
        Gain direct access to our vibrant community of{" "}
        <strong className="font-bold">
          over 4000+ developers, designers, and tech enthusiasts
        </strong>{" "}
        in Bandung. This is a golden opportunity to introduce your brand,
        products, or services to a relevant and receptive audience.
      </>
    ),
  },
  {
    icon: <Megaphone className="h-6 w-6 text-gdg-red" />,
    title: "Enhance Brand Recognition",
    description:
      "Put your brand in the spotlight within Bandung's tech scene. Through our diverse events and digital platforms, your brand visibility will significantly increase, building a positive image as a key supporter of technological innovation.",
  },
  {
    icon: <Users className="h-6 w-6 text-gdg-green" />,
    title: "Unlock Networking Opportunities",
    description:
      "Build strategic connections with top digital talents, industry leaders, and leading tech companies in Bandung. This network opens doors for future collaborations, talent acquisition, and valuable market insights.",
  },
  {
    icon: <Award className="h-6 w-6 text-gdg-yellow" />,
    title: "Recruit Top Tech Talent",
    description: (
      <>
        Engage directly with attendees from various tech backgrounds, including{" "}
        <strong className="font-bold">
          developers, software engineers, and startup founders
        </strong>
        . As a sponsor, you have this unique opportunity to interact directly,
        opening up powerful{" "}
        <strong>recruitment and collaboration possibilities.</strong>
      </>
    ),
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
    title: "Establish Thought Leadership",
    description:
      "Seize the chance to share your company's expertise, case studies, or latest technologies through dedicated sessions or workshops. This positions your brand as a thought leader and innovator in the industry.",
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
    title: "Gain Product Feedback & Early Adopters",
    description:
      "Looking to test a product or gather direct insights? The GDG Bandung community is the ideal place to receive constructive feedback from a tech-savvy audience.",
  },
  {
    icon: <Heart className="h-6 w-6 text-red-500" />,
    title: "Demonstrate Community Support & CSR",
    description:
      "Showcase your company's commitment to local tech ecosystem development. Partnering with us is a tangible way to fulfill your Corporate Social Responsibility (CSR) goals with real impact.",
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-500" />,
    title: "Associate with Innovation",
    description:
      "Align your brand with the spirit of cutting-edge technology exploration, creativity, and collaboration that defines GDG Bandung and the global Google Developer Groups community.",
  },
  {
    icon: <Globe className="h-6 w-6 text-green-500" />,
    title: "Direct Connection to Google Technology Ecosystem",
    description: (
      <>
        GDG Bandung is your gateway to a community focused on developing and
        implementing Google technologies – from{" "}
        <strong>
          Android, Firebase, AI/ML, Flutter, Web Technologies, etc.
        </strong>{" "}
        This is a unique chance to reach developers deep in these platforms.
      </>
    ),
  },
];
