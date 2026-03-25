import type { LucideIcon, LucideProps } from "lucide-react";
import {
  BarChart3,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Eye,
  Globe,
  Instagram,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  PenTool,
  Phone,
  Quote,
  Rocket,
  Search,
  Send,
  Share2,
  ShoppingCart,
  Star,
  Target,
  TrendingUp,
  Twitter,
  Zap,
} from "lucide-react";
import type { IconName } from "@/lib/cms-types";

export const CONTENT_ICONS: Record<IconName, LucideIcon> = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  search: Search,
  "shopping-cart": ShoppingCart,
  "share-2": Share2,
  "pen-tool": PenTool,
  "bar-chart-3": BarChart3,
  globe: Globe,
  target: Target,
  lightbulb: Lightbulb,
  eye: Eye,
  "trending-up": TrendingUp,
  rocket: Rocket,
  calendar: Calendar,
  star: Star,
  zap: Zap,
  quote: Quote,
  check: Check,
  clock: Clock,
  send: Send,
  "check-circle": CheckCircle,
};

export const CONTENT_ICON_OPTIONS: Array<{
  value: IconName;
  label: string;
}> = [
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "mail", label: "Mail" },
  { value: "phone", label: "Phone" },
  { value: "map-pin", label: "Map Pin" },
  { value: "search", label: "Search" },
  { value: "shopping-cart", label: "Shopping Cart" },
  { value: "share-2", label: "Share" },
  { value: "pen-tool", label: "Pen Tool" },
  { value: "bar-chart-3", label: "Bar Chart" },
  { value: "globe", label: "Globe" },
  { value: "target", label: "Target" },
  { value: "lightbulb", label: "Lightbulb" },
  { value: "eye", label: "Eye" },
  { value: "trending-up", label: "Trending Up" },
  { value: "rocket", label: "Rocket" },
  { value: "calendar", label: "Calendar" },
  { value: "star", label: "Star" },
  { value: "zap", label: "Zap" },
  { value: "quote", label: "Quote" },
  { value: "check", label: "Check" },
  { value: "clock", label: "Clock" },
  { value: "send", label: "Send" },
  { value: "check-circle", label: "Check Circle" },
];

export function ContentIcon({
  name,
  ...props
}: LucideProps & {
  name: IconName;
}) {
  const Icon = CONTENT_ICONS[name];
  return <Icon {...props} />;
}
