import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'workflows',
        href: '/workflows',
        icon: LayoutGrid,
    },
    {
        title: 'Web Content',
        href: '/dashboard/web-contents',
        icon: LayoutGrid,
    },
    {
        title: 'projects',
        href: '/dashboard/projects',
        icon: LayoutGrid,
    },
    {
        title: 'project_files',
        href: '/dashboard/project_files',
        icon: LayoutGrid,
    },
    {
        title: 'settings',
        href: '/dashboard/settings',
        icon: LayoutGrid,
    },
    {
        title: 'project_teams',
        href: '/dashboard/project_teams',
        icon: LayoutGrid,
    },
    {
        title: 'crew_roles',
        href: '/dashboard/crew_roles',
        icon: LayoutGrid,
    },
    {
        title: 'team_names',
        href: '/dashboard/team_names',
        icon: LayoutGrid,
    },
    {
        title: 'project_category',
        href: '/dashboard/project_category',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
