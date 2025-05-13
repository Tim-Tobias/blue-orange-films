import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, ProjectCategory } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Project Category',
        href: '/dashboard/Project Category',
    },
];

type FormWebContentProps = {
    isEdit?: boolean;
    projectCategory?: ProjectCategory;
};

export const projectCategoryScheme = z.object({
    name: z.string().min(1, { message: 'Project category name is required' }),
});

export type ProjectCategoryFormData = z.infer<typeof projectCategoryScheme>;

export default function FormWebContent({ isEdit = false, projectCategory }: FormWebContentProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectCategoryFormData>({
        resolver: zodResolver(projectCategoryScheme),
        defaultValues: {
            name: projectCategory?.name || '',
        },
    });

    const onSubmit = (form: ProjectCategoryFormData) => {
        const formData = new FormData();
        formData.append('name', form.name);

        if (isEdit && projectCategory?.id) {
            formData.append('_method', 'PUT');
            router.post(`/dashboard/project-categories/${projectCategory.id}`, formData, {
                forceFormData: true,
                onSuccess: () => {},
            });
        } else {
            router.post('/dashboard/project-categories', formData, {
                forceFormData: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} Project Category`} />
            <AppWrapper>
                <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Project Category</h1>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
                            <div>
                                <label className="mb-1 block">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <Input type="text" {...register('name')} className={`form-control mt-2 ${errors.name ? 'border-red-500' : ''}`} />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </AppWrapper>
        </AppLayout>
    );
}
