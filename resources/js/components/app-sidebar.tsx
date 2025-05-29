import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Banner',
        href: '/dashboard/banners',
        icon: LayoutGrid,
    },
    {
        title: 'About',
        href: '/dashboard/abouts',
        icon: LayoutGrid,
    },
    {
        title: 'About - Services',
        href: '/dashboard/services',
        icon: LayoutGrid,
    },
    {
        title: 'About - How We Work',
        href: '/dashboard/hww',
        icon: LayoutGrid,
    },
    {
        title: 'Workflows',
        href: '/dashboard/workflows',
        icon: LayoutGrid,
    },
    {
        title: 'About - Client',
        href: '/dashboard/clients',
        icon: LayoutGrid,
    },
    {
        title: 'Contact',
        href: '/dashboard/contacts',
        icon: LayoutGrid,
    },
    {
        title: 'Contact Carousell',
        href: '/dashboard/contact-carousell',
        icon: LayoutGrid,
    },
    {
        title: 'Contact Content',
        href: '/dashboard/contact-content',
        icon: LayoutGrid,
    },
    {
        title: 'Socials',
        href: '/dashboard/socials',
        icon: LayoutGrid,
    },
    {
        title: 'Projects Sections',
        icon: LayoutGrid,
        items: [
            {
                title: 'Categories',
                href: '/dashboard/project-categories',
                icon: LayoutGrid,
            },
            {
                title: 'Projects',
                href: '/dashboard/projects',
                icon: LayoutGrid,
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
