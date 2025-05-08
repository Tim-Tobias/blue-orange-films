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
    highlight_video: z.any().optional(),

    teams: z.array(
        z.object({
            name: z.string(),
            role: z.string(),
        }),
    ),
    files: z.array(
        z.object({
            title: z.string(),
            category: z.enum(['video', 'image']),
            project_link: z.any(),
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
            highlight_video: undefined,
            teams: [{ name: '', role: '' }],
            files: [{ title: '', category: 'image', project_link: null, description: '' }],
        },
    });

    const { handleSubmit } = form;

    const onSubmit = (data: ProjectFormData) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'highlight_video' && value instanceof FileList) {
                formData.append(key, value[0]);
            } else if (key === 'teams' || key === 'files') {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value as string);
            }
        });

        router.post('/dsahboard/projects', formData, {
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
