import { NavSection } from "@workspace/ui/components/nav-section";
import {
  IconDashboard,
  IconDatabase,
  IconDatabaseStar,
  IconFolderStar,
  IconListDetails,
  IconUsers
} from "@tabler/icons-react";



export const sections: readonly NavSection[] = [
  {
    title: undefined,
    items: [
      {
        name: "Dashboard",
        icon: IconDashboard,
        url: "/dashboard"
      },
      {
        name: "Team",
        url: "/dashboard/team",
        icon: IconUsers,
        isComingSoon: true
      },
      {
        name: "Lifecycle",
        url: "/dashboard/lifecycle",
        icon: IconListDetails,
        isComingSoon: true
      }
    ]
  },
  {
    title: "Documents",
    items: [
      {
        name: "Clients",
        url: "/dashboard/clients",
        icon: IconDatabase,
      },
      {
        name: "My Clients",
        url: "/dashboard/my-clients",
        icon: IconDatabaseStar,
      },
      {
        name: "My Projects",
        url: "/dashboard/my-projects",
        icon: IconFolderStar,
        isComingSoon: true
      },
    ]
  }
];