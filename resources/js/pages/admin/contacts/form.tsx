import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Contact } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import Editor from 'react-simple-wysiwyg';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Contacts',
        href: '/dashboard/contacts',
    },
];

type FormWebContentProps = {
    isEdit?: boolean;
    contact?: Contact;
};

export const contactScheme = z.object({
    phone: z.string().min(1, { message: 'Contacts phone is required' }),
    email: z.string().min(1, { message: 'Contacts email is required' }),
    address: z.string().min(1, { message: 'address is required' }),
    is_active: z.enum(['true', 'false']),
});

export type contactFormData = z.infer<typeof contactScheme>;

export default function FormWebContent({ isEdit = false, contact }: FormWebContentProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<contactFormData>({
        resolver: zodResolver(contactScheme),
        defaultValues: {
            phone: contact?.phone || '',
            email: contact?.email || '',
            address: contact?.address || '',
            is_active: contact?.is_active ? 'true' : 'false',
        },
    });

    const onSubmit = (form: contactFormData) => {
        const formData = new FormData();
        formData.append('phone', form.phone);
        formData.append('email', form.email);
        formData.append('address', form.address);
        formData.append('is_active', form.is_active === 'true' ? '1' : '0');

        if (isEdit && contact?.id) {
            formData.append('_method', 'PUT');
            router.post(`/dashboard/contacts/${contact.id}`, formData, {
                forceFormData: true,
                onSuccess: () => {},
            });
        } else {
            router.post('/dashboard/contacts', formData, {
                forceFormData: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} Contacts`} />
            <AppWrapper>
                <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Contacts</h1>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
                            <div>
                                <label className="mb-1 block">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <Input type="text" {...register('phone')} className={`form-control mt-2 ${errors.phone ? 'border-red-500' : ''}`} />
                                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                            </div>
                            <div>
                                <label className="mb-1 block">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <Input type="text" {...register('email')} className={`form-control mt-2 ${errors.email ? 'border-red-500' : ''}`} />
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <Editor value={watch('address') || ''} onChange={(e) => setValue('address', e.target.value)} />
                                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">Status Aktif</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-1">
                                        <input type="radio" value="true" {...register('is_active')} />
                                        Aktif
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input type="radio" value="false" {...register('is_active')} />
                                        Tidak Aktif
                                    </label>
                                </div>
                                {errors.is_active && <p className="text-sm text-red-500">{errors.is_active?.message}</p>}
                            </div>

                            <Button type="submit">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </AppWrapper>
        </AppLayout>
    );
}
