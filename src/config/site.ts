interface SidebarNavItem {
  title: string
  href: string
  icon?: string
  disabled?: boolean
  external?: boolean
  label?: string
  children?: SidebarNavItem[]
}

interface MainNavItem {
  title: string
  href: string
  disabled?: boolean
}

interface SiteConfig {
  name: string
  description: string
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const siteConfig: SiteConfig = {
  name: "Estate Pro",
  description: "Modern real estate management system",
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
  ],
  sidebarNav: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: "layout-dashboard",
    },
    {
      title: "Properties",
      href: "/dashboard/properties",
      icon: "home",
      children: [
        {
          title: "All Properties",
          href: "/dashboard/properties",
          icon: "list",
        },
        {
          title: "Featured",
          href: "/dashboard/properties/featured",
          icon: "star",
        },
      ],
    },
    {
      title: "Agents",
      href: "/dashboard/agents",
      icon: "users",
      children: [
        {
          title: "All Agents",
          href: "/dashboard/agents",
          icon: "users",
        },
      ],
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: "user",
    },
    {
      title: "Finance",
      href: "/dashboard/finance",
      icon: "credit-card",
      children: [
        {
          title: "Transactions",
          href: "/dashboard/finance/transactions",
          icon: "credit-card",
        },
        {
          title: "Invoices",
          href: "/dashboard/finance/invoices",
          icon: "file-text",
        },
        {
          title: "Reports",
          href: "/dashboard/finance/reports",
          icon: "bar-chart",
        },
      ],
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: "bar-chart-3",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}