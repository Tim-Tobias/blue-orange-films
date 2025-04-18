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

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
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

export interface WebContent {
    id: number;
    title?: string;
    content?: string;
    image?: string | null;
    section: string;
    created_at: string;
    updated_at: string;
}



export interface ProjectCategory {
    id: number;
    name?: string;
    created_at: string;
    updated_at: string;
}

export interface Projects {
    id: number;
    highlight_link: string;
    title: string;
    year: number | string; 
    duration: string;
    aspect_ratio: string;
    description: string;
    client: string;
    agency: string;
    id_project_category: number | string; 
    created_at: string;
    updated_at: string;
    teamMembers?: {
        id: string;
        teamName: string;
        crewRoles: string;
    }[];
}

export interface ProjectTeam {
    id: number;
    id_project: number;
    nameTeam: string;
    nameRoles: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface ProjectFile {
    id: number;
    project_id: number;
    title: string;
    project_link: string;
    category: 'image' | 'video';
    description: string;
    created_at: string | null;
    updated_at: string | null;
}
export interface ProjectDetail {
    id: number;
    highlight_link: string;
    title: string;
    year: number;
    duration: string;
    aspect_ratio: string;
    description: string;
    client: string;
    agency: string;
    id_project_category: number;
    created_at: string;
    updated_at: string;
    projectTeams: ProjectTeam[];
    projectFiles: ProjectFile[];
}

interface TeamMember {
    id: string;
    teamName: string;
    crewRoles: string;
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



