import {
    BookOpen,
    Bot,
    CreditCard,
    Frame,
    Key,
    LayoutDashboard,
    LifeBuoy,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
    Users,
    Map as MapIcon
} from "lucide-react";

export const SidebarData = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "Users",
            url: "/dashboard/users",
            icon: Users,
        },
        {
            title: "API Keys",
            url: "/dashboard/api-keys",
            icon: Key,
        },
        {
            title: "Billing",
            url: "/dashboard/billing",
            icon: CreditCard,
        },
        // {
        //     title: "Playground",
        //     url: "#",
        //     icon: SquareTerminal,
        //     items: [
        //         {
        //             title: "History",
        //             url: "#",
        //         },
        //         {
        //             title: "Starred",
        //             url: "#",
        //         },
        //         {
        //             title: "Settings",
        //             url: "#",
        //         },
        //     ],
        // },
        // {
        //     title: "Models",
        //     url: "#",
        //     icon: Bot,
        //     items: [
        //         {
        //             title: "Genesis",
        //             url: "#",
        //         },
        //         {
        //             title: "Explorer",
        //             url: "#",
        //         },
        //         {
        //             title: "Quantum",
        //             url: "#",
        //         },
        //     ],
        // },
    //     {
    //         title: "Documentation",
    //         url: "#",
    //         icon: BookOpen,
    //         items: [
    //             {
    //                 title: "Introduction",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Get Started",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Tutorials",
    //                 url: "#",
    //             },
    //             {
    //                 title: "Changelog",
    //                 url: "#",
    //             },
    //         ],
    //     },
    //     {
    //         title: "Settings",
    //         url: "/dashboard/settings",
    //         icon: Settings2,
    //     },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings2,
        },
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: MapIcon,
        },
    ],
};
