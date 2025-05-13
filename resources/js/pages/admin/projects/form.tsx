import { AppWrapper } from '@/components/app-wrapper';
import AppLayout from '@/layouts/app-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import FilesForm from './layouts/form_files';
import ProjectForm from './layouts/form_project';
import TeamForm from './layouts/form_team';

import { BreadcrumbItem, ProjectCategory } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/dashboard/Projects' },
];

const projectSchema = z.object({
    title: z.string().min(1),
    year: z.string().min(4),
    duration: z.string(),
    aspect_ratio: z.string(),
    category: z.string(),
    description: z.string(),
    highlight: z.union([z.string(), z.instanceof(File)]),
    highlight_type: z.enum(['image', 'video']),

    teams: z.array(
        z.object({
            id_name: z.number(),
            name: z.string(),
            id_role: z.number(),
            role: z.string(),
        }),
    ),
    files: z.array(
        z.object({
            title: z.string(),
            category: z.enum(['video', 'image']),
            project_link: z.union([z.string(), z.instanceof(File)]),
            description: z.string(),
        }),
    ),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

interface FormProjectsProps {
    isEdit?: boolean;
    categories: ProjectCategory[];
}

export default function FormProjects({ isEdit = false, categories }: FormProjectsProps) {
    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: '',
            year: '',
            duration: '',
            aspect_ratio: '',
            category: '',
            description: '',
            highlight: '',
            highlight_type: 'image',
            teams: [{ id_name: 0, name: '', id_role: 0, role: '' }],
            files: [{ title: '', category: 'image', project_link: '', description: '' }],
        },
    });

    const { handleSubmit } = form;

    const onSubmit = (data: ProjectFormData) => {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('year', data.year);
        formData.append('duration', data.duration);
        formData.append('aspect_ratio', data.aspect_ratio);
        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('highlight_type', data.highlight_type);

        if (data.highlight instanceof File) {
            formData.append('highlight', data.highlight);
        } else if (typeof data.highlight === 'string') {
            formData.append('highlight', data.highlight);
        }

        data.teams.forEach((team, i) => {
            formData.append(`teams[${i}][id_name]`, String(team.id_name));
            formData.append(`teams[${i}][id_role]`, String(team.id_role));
            formData.append(`teams[${i}][name]`, String(team.name));
            formData.append(`teams[${i}][role]`, String(team.role));
        });

        data.files.forEach((file, i) => {
            formData.append(`files[${i}][title]`, file.title);
            formData.append(`files[${i}][category]`, file.category);
            formData.append(`files[${i}][description]`, file.description);
            formData.append(`files[${i}][project_link]`, file.project_link);
        });

        router.post('/dashboard/projects', formData, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} Web Content`} />
            <AppWrapper>
                <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Web Content</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <ProjectForm categories={categories} form={form} />
                    <TeamForm form={form} />
                    <FilesForm form={form} />

                    <Button type="submit">Submit</Button>
                </form>
            </AppWrapper>
        </AppLayout>
    );
}
