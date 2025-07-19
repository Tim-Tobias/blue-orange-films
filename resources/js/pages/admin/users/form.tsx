import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/dashboard/users' },
];

type FormUserProps = {
    isEdit?: boolean;
    data?: User;
};

const userSchema = z
    .object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email'),
        password: z.string().optional(),
        password_confirmation: z.string().optional(),
        role: z.enum(['admin', 'user'], { required_error: 'Role is required' }),
    })
    .refine(
        (data) => {
            if (!data.password) return true;
            return data.password === data.password_confirmation;
        },
        {
            message: 'Passwords do not match',
            path: ['password_confirmation'],
        },
    );

type UserFormData = z.infer<typeof userSchema>;

export default function FormUser({ isEdit = false, data }: FormUserProps) {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: data?.name ?? '',
            email: data?.email ?? '',
            password: '',
            password_confirmation: '',
            role: data?.role ?? 'user',
        },
    });

    const onSubmit = (form: UserFormData) => {
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        if (form.password) {
            formData.append('password', form.password);
            formData.append('password_confirmation', form.password_confirmation ?? '');
        }
        formData.append('role', form.role);

        if (isEdit && data?.id) {
            formData.append('_method', 'PUT');
            router.post(`/dashboard/users/${data.id}`, formData, {
                forceFormData: true,
                onSuccess: () => {
                    router.visit('/dashboard/users');
                },
                onError: (err) => {
                    console.error('GAGAL kirim:', err);
                },
            });
        } else {
            router.post('/dashboard/users', formData, {
                forceFormData: true,
                onSuccess: () => {
                    router.visit('/dashboard/users');
                },
                onError: (err) => {
                    console.error('GAGAL kirim:', err);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} User`} />
            <AppWrapper>
                <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} User</h1>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="mb-1 block">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <Input type="text" {...register('name')} className={errors.name ? 'border-red-500' : ''} />
                                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <Input type="email" {...register('email')} className={errors.email ? 'border-red-500' : ''} />
                                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block">Password {!isEdit && <span className="text-red-500">*</span>}</label>
                                <Input
                                    type="password"
                                    {...register('password')}
                                    className={errors.password ? 'border-red-500' : ''}
                                    placeholder={isEdit ? 'Kosongkan jika tidak ingin ganti password' : ''}
                                />
                                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block">Konfirmasi Password {!isEdit && <span className="text-red-500">*</span>}</label>
                                <Input
                                    type="password"
                                    {...register('password_confirmation')}
                                    className={errors.password_confirmation ? 'border-red-500' : ''}
                                    placeholder={isEdit ? 'Kosongkan jika tidak ingin ganti password' : ''}
                                />
                                {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation.message}</p>}
                            </div>

                            <div>
                                <label className="mb-1 block">
                                    Role <span className="text-red-500">*</span>
                                </label>
                                <Select defaultValue={data?.role ?? 'user'} onValueChange={(val: 'admin' | 'user') => setValue('role', val)}>
                                    <SelectTrigger className="mt-2">
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                                <input type="hidden" {...register('role')} />
                                {errors.role && <p className="text-red-500">{errors.role.message}</p>}
                            </div>

                            <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
                        </form>
                    </CardContent>
                </Card>
            </AppWrapper>
        </AppLayout>
    );
}
