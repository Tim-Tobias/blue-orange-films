import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Client, type BreadcrumbItem } from '@/types';
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
        title: 'Client',
        href: '/dashboard/clients',
    },
];

type FormClientProps = {
    isEdit?: boolean;
    data?: Client;
};

export const clientScheme = z.object({
    name: z.string().optional(),
});

export type ClientFormData = z.infer<typeof clientScheme>;

export default function FormClient({ isEdit = false, data }: FormClientProps) {
    const { errors: errorsBackend } = usePage().props;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(data?.image_url || null);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<ClientFormData>({
        resolver: zodResolver(clientScheme),
        defaultValues: {
            name: data?.name || '',
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmit = (form: ClientFormData) => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('name', form.name || '');

        if (image instanceof File) {
            formData.append('image', image);
        }

        if (isEdit && data?.id) {
            formData.append('_method', 'PUT');

            router.post(`/dashboard/clients/${data.id}`, formData, {
                forceFormData: true,
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        } else {
            router.post('/dashboard/clients', formData, {
                forceFormData: true,
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} Client`} />

            <AppWrapper>
                <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Client</h1>

                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
                            <div>
                                <label>Name</label>
                                <Input type="text" {...register('name')} className="form-control mt-2" />
                                {(errors.name || errorsBackend) && <p className="text-red-500">{errors.name?.message ?? errorsBackend.name}</p>}
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
