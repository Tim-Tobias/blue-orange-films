import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Service, type BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SyncLoader } from 'react-spinners';
import { z } from 'zod';
import Editor from 'react-simple-wysiwyg';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Service',
        href: '/dashboard/services',
    },
];

type FormServiceProps = {
    isEdit?: boolean;
    data?: Service;
};

export const serviceScheme = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Desription is required'),
    is_active: z.enum(['true', 'false']),
});

export type ServiceFormData = z.infer<typeof serviceScheme>;

export default function FormService({ isEdit = false, data }: FormServiceProps) {
    const { errors: errorsBackend } = usePage().props;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(data?.image_url || null);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ServiceFormData>({
        resolver: zodResolver(serviceScheme),
        defaultValues: {
            title: data?.title || '',
            description: data?.description || '',
            is_active: data?.is_active ? 'true' : 'false'
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmit = (form: ServiceFormData) => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('title', form.title || '');
        formData.append('description', form.description || '');
        formData.append('is_active', form.is_active === 'true' ? '1' : '0');

        if (image instanceof File) {
            formData.append('image', image);
        }

        if (isEdit && data?.id) {
            formData.append('_method', 'PUT');

            router.post(`/dashboard/services/${data.id}`, formData, {
                forceFormData: true,
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        } else {
            router.post('/dashboard/services', formData, {
                forceFormData: true,
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} Service`} />

            <AppWrapper>
                <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Service</h1>

                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
                            <div>
                                <label>Title</label>
                                <Input type="text" {...register('title')} className="form-control mt-2" />
                                {(errors.title || errorsBackend) && <p className="text-red-500">{errors.title?.message ?? errorsBackend.title}</p>}
                            </div>
                            <div>
                                <label className="mb-1 block font-medium">Content</label>
                                <Editor
                                    value={watch('description') || ''}
                                    onChange={(e) => setValue('description', e.target.value)}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description.message}</p>
                                )}
                            </div>

                            {previewUrl && (
                                <div className="space-y-2">
                                    <h6>Preview:</h6>
                                    <img src={previewUrl} alt="Preview" className="h-32 w-32 object-cover" />
                                </div>
                            )}

                            <div>
                                <label>Image</label>
                                <Input type="file" onChange={handleImageChange} className="form-control mt-2" accept="image/*" />
                                {errorsBackend && <p className="text-red-500">{errorsBackend.image}</p>}
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Status Aktif</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="radio"
                                            value="true"
                                            {...register("is_active")}
                                        />
                                        Aktif
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="radio"
                                            value="false"
                                            {...register("is_active")}
                                        />
                                        Tidak Aktif
                                    </label>
                                </div>
                                {(errors.is_active || errorsBackend?.is_active) && (
                                    <p className="text-sm text-red-500">{errors.is_active?.message ?? errorsBackend?.is_active}</p>
                                )}
                            </div>

                            <Button disabled={isSubmitting} type="submit">
                                {isSubmitting ? <SyncLoader size={10} color="#59b4c7" /> : 'submit'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </AppWrapper>
        </AppLayout>
    );
}
