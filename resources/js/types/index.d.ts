import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavSubItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface NavItem {
    title: string;
    href?: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavSubItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash: {
        error?: string;
        success?: string;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Banner {
    id: number;
    title?: string;
    banner?: string | null;
    image_url?: string;
    section: string;
    category: 'video' | 'image'; // enum type
    created_at: string;
    updated_at: string;
}

export interface ProjectCategory {
    id: number;
    name?: string;
    created_at: string;
    updated_at: string;
}

interface CrewRole {
    id: string;
    name: string;
}

export interface ProjectFiles {
    id: number;
    project_id: number;
    title: string;
    project_link: string;
    category: 'video' | 'image'; // enum type
    description: string;
    created_at: string;
    updated_at: string;
}

export interface ProjectTeams {
    id: number;
    id_project: number;
    id_crew_roles: number;
    id_name_crew: number;
    created_at: string;
    updated_at: string;
}

export interface TeamNames {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CategorySection {
    section: string;
}

export interface Workflow {
    id: number;
    title?: string;
    desc?: string;
    order: number;
}

export interface About {
    id: number;
    image_url?: string;
    content?: string;
}

export interface Service {
    id: number;
    image_url?: string;
    title?: string;
    description?: string;
}

export interface Hww {
    id: number;
    title?: string;
    content?: string;
}

export interface Step {
    id: number;
    number?: string;
    title?: string;
    description?: string;
}

export interface Client {
    id: number;
    name?: string;
    image_url?: string;
}

export interface Contact {
    id: number;
    phone?: string;
    email?: string;
    address?: string;
}
export interface ContactCarousell {
    id: number;
    title?: string;
    image?: string;
}

export interface Social {
    id: number;
    name?: string;
    link?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    from: number | null;
    to: number | null;
    per_page: number;
    total: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
    first_page_url: string;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
