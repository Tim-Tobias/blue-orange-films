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

import { capitalizeWords } from '@/helpers/capital_letter';
import { BreadcrumbItem, Project, ProjectCategory } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/dashboard/Projects' },
];

const projectSchema = z.object({
    title: z.string().min(1),
    agency: z.string().min(1),
    date: z.string().min(4),
    duration: z.string(),
    category: z.string(),
    description: z.string(),
    highlight: z.string().min(1),
    highlight_image: z.instanceof(File).optional(),
    client: z.string(),

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
    project?: Project;
}

export default function FormProjects({ isEdit = false, categories, project }: FormProjectsProps) {
    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: isEdit ? project?.title : '',
            date: isEdit ? String(project?.date) : '',
            duration: isEdit ? project?.duration : '',
            category: isEdit ? String(project?.id_project_category) : '',
            description: isEdit ? project?.description : '',
            highlight: isEdit ? String(project?.highlight_link) : '',
            client: isEdit ? project?.client : '',
            highlight_image: undefined,
            agency: isEdit ? project?.agency : '',
            teams: isEdit
                ? (project?.teams ?? []).map((team) => ({
                      id_name: team.id_name_crew,
                      name: capitalizeWords(team.name_crew?.name || ''),
                      id_role: team.id_crew_roles,
                      role: capitalizeWords(team.role?.name || ''),
                  })) || []
                : [],
            files: isEdit
                ? (project?.files ?? []).map((file) => ({
                      title: file.title,
                      category: file.category,
                      project_link: isEdit ? String(file.project_link) : '',
                      description: file.description,
                  })) || []
                : [],
        },
    });

    const { handleSubmit } = form;

    const onSubmit = (data: ProjectFormData) => {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('agency', data.agency);
        formData.append('date', data.date);
        formData.append('duration', data.duration);
        formData.append('category', data.category);
        formData.append('description', data.description);
        formData.append('client', data.client);
        formData.append('highlight', data.highlight);

        if (data.highlight_image) {
            formData.append('highlight_image', data.highlight_image);
        }

        if (data.teams.length > 0) {
            data.teams.forEach((team, i) => {
                formData.append(`teams[${i}][id_name]`, String(team.id_name));
                formData.append(`teams[${i}][id_role]`, String(team.id_role));
                formData.append(`teams[${i}][name]`, String(team.name));
                formData.append(`teams[${i}][role]`, String(team.role));
            });
        } else {
            formData.append('teams', String([]));
        }

        if (data.files.length > 0) {
            data.files.forEach((file, i) => {
                formData.append(`files[${i}][title]`, file.title);
                formData.append(`files[${i}][category]`, file.category);
                formData.append(`files[${i}][description]`, file.description);
                formData.append(`files[${i}][project_link]`, file.project_link);
            });
        } else {
            formData.append('files', String([]));
        }

        console.log(formData);

        if (isEdit) {
            formData.append('_method', 'PUT');
            formData.append('id', String(project?.id));

            router.post(`/dashboard/projects/${project?.id}`, formData, {
                forceFormData: true,
            });
        } else {
            console.log(...formData);

            router.post('/dashboard/projects', formData, {
                forceFormData: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} Web Content`} />
            <AppWrapper>
                <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Web Content</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <ProjectForm isEdit={isEdit} project={project} categories={categories} form={form} />
                    <TeamForm form={form} />
                    <FilesForm isEdit={isEdit} form={form} />

                    <Button type="submit">Submit</Button>
                </form>
            </AppWrapper>
        </AppLayout>
    );
}
