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

export interface Project {
    id: number;
    title: string;
    year: string;
    duration: string;
    aspect_ratio: string;
    highlight_link: string;
    highlight_url?: string;
    highlight_image_url?: string;
    highlight_image: string | File;
    description?: string;
    id_project_category: string;
    client: string;
    agency: string;
    category?: ProjectCategory;
    teams?: ProjectTeam[];
    files?: ProjectFile[];
    created_at?: string;
    updated_at?: string;
}

export interface ProjectTeam {
    id: number;
    project_id: number;
    id_name_crew: number;
    id_crew_roles: number;
    name_crew?: TeamName;
    role?: CrewRole;
    created_at?: string;
    updated_at?: string;
}

export interface ProjectCategory {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface CrewRole {
    id: string;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface ProjectFile {
    id: number;
    project_id: number;
    title: string;
    project_link: string;
    project_url: string;
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

export interface TeamName {
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
    title: string;
    desc: string;
    order: number;
}

export interface About {
    id: number;
    image_url?: string;
    content?: string;
    is_active?: boolean;
}

export interface Hww {
    title: string;
    content: string;
}

export interface Service {
    id: number;
    image_url?: string;
    title?: string;
    description?: string;
    is_active?: boolean;
}

export interface Hww {
    id: number;
    title?: string;
    content?: string;
    is_active?: boolean;
}

export interface ContactContent {
    id: number;
    title?: string;
    content?: string;
    is_active?: boolean;
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
    is_active?: boolean;
}

export interface Contact {
    id: number;
    phone?: string;
    email?: string;
    address?: string;
    is_active?: boolean;
}
export interface ContactCarousell {
    id: number;
    title?: string;
    image?: string;
    is_active?: boolean;
    image_url: string;
}

export interface Social {
    id: number;
    name?: string;
    link?: string;
    is_active?: boolean;
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
