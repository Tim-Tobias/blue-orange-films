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
    title: z.string().optional(),
    description: z.string().optional(),
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
        formState: { errors },
    } = useForm<ServiceFormData>({
        resolver: zodResolver(serviceScheme),
        defaultValues: {
            title: data?.title || '',
            description: data?.description || '',
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
								<label className="mb-1 block">
									Description <span className="text-red-500">*</span>
								</label>
								<textarea
									rows={4}
									{...register('description')}
									className={`form-control mt-2 w-full rounded border px-3 py-2 ${
										errors.description ? 'border-red-500' : 'border-gray-300'
									}`}
								/>
								{errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
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
