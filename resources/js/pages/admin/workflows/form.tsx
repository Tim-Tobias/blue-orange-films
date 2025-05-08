import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Workflow, type BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { Select } from '@radix-ui/react-select';
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
        title: 'Workflows',
        href: '/dashboard/workflows',
    },
];

interface FormWorkflowProps {
    isEdit?: boolean;
    data?: Workflow;
    orders?: number;
};

export const WorkflowScheme = z.object({
    title: z.string().optional(),
    desc: z.string().optional(),
    order: z.number().optional(),
});

export type WorkflowFormData = z.infer<typeof WorkflowScheme>;

export default function FormWorkflow({ isEdit = false, data, orders }: FormWorkflowProps) {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [numbers, setNumbers] = useState<number[]>([]);
    const { errors: errorsBackend } = usePage().props;

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<WorkflowFormData>({
        resolver: zodResolver(WorkflowScheme),
        defaultValues: {
            title: data?.title || '',
            desc: data?.desc || '',
            order: data?.order || 0,
        },
    });

    const onSubmit = (form: WorkflowFormData) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('title', form.title || '');
        formData.append('desc', form.desc || '');

        if (isEdit && data?.id) {
            formData.append('_method', 'PUT');
            formData.append('order', String(form.order));

            router.post(`/dashboard/workflows/${data.id}`, formData, {
                forceFormData: true,
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        } else {
            router.post('/dashboard/workflows', formData, {
                forceFormData: true,
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        }
    };

    useEffect(() => {
        if (orders) {
            Array.from({ length: Number(orders) }, (_, i) => setNumbers((prev) => [...prev, i + 1]));
        }
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} Workflows`} />

            <AppWrapper>
                <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Workflows</h1>

                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
                            <div>
                                <label>Title</label>
                                <Input type="text" {...register('title')} className="form-control mt-2" />
                                {(errors.title || errorsBackend) && <p className="text-red-500">{errors.title?.message ?? errorsBackend.title}</p>}
                            </div>

                            {orders && (
                                <div>
                                    <label>Section</label>
                                    <Select
                                        defaultValue={String(data?.order)}
                                        onValueChange={(val) => setValue('order', Number(val), { shouldValidate: true })}
                                        name="section"
                                    >
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Select a order" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {numbers.map((item, index) => (
                                                <SelectItem key={index} value={String(item)}>
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {(errors.order || errorsBackend) && (
                                        <p className="text-red-500">{errors.order?.message ?? errorsBackend.order}</p>
                                    )}
                                </div>
                            )}

                            <div>
                                <label>Description</label>
                                <Textarea {...register('desc')}></Textarea>
                                {(errors.desc || errorsBackend) && <p className="text-red-500">{errors.desc?.message ?? errorsBackend.desc}</p>}
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
