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
          title: "Add Property",
          href: "/dashboard/properties/add",
          icon: "plus",
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
        {
          title: "Performance",
          href: "/dashboard/agents/performance",
          icon: "trending-up",
        },
      ],
    },
    {
      title: "Clients",
      href: "/dashboard/clients",
      icon: "user",
    },
    {
      title: "Finance",
      href: "/dashboard/transactions",
      icon: "credit-card",
      children: [
        {
          title: "Transactions",
          href: "/dashboard/transactions",
          icon: "credit-card",
        },
        {
          title: "Invoices",
          href: "/dashboard/invoices",
          icon: "file-text",
        },
        {
          title: "Reports",
          href: "/dashboard/reports",
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