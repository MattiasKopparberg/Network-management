
import {
  LayoutDashboard,
  Monitor,
  MapPin,
  Network,
  GitBranch,
  CalendarClock,
  Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type NavigationGroup = "main" | "network" | "operations";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  group: NavigationGroup;
};

export const navigationGroups: {
  id: NavigationGroup;
  label: string;
}[] = [
  { id: "main", label: "Overview" },
  { id: "network", label: "Network" },
  { id: "operations", label: "Management" },
];

export const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    group: "main",
  },
  {
    label: "Devices",
    href: "/devices",
    icon: Monitor,
    group: "network",
  },
  {
    label: "Locations",
    href: "/locations",
    icon: MapPin,
    group: "network",
  },
  {
    label: "VLANs",
    href: "/vlan",
    icon: Network,
    group: "network",
  },
  {
    label: "Device VLANs",
    href: "/device-vlan",
    icon: GitBranch,
    group: "network",
  },
  {
    label: "Maintenance",
    href: "/maintenance",
    icon: CalendarClock,
    group: "operations",
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
    group: "operations",
  },
];
