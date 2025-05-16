import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Hww } from '@/types';
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
		title: 'How We Works',
		href: '/dashboard/hww',
	},
];

type FormWebContentProps = {
	isEdit?: boolean;
	hww?: Hww;
};

export const hwwScheme = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	content: z.string().min(1, { message: 'Content is required' }),
});

export type hwwFormData = z.infer<typeof hwwScheme>;

export default function FormWebContent({ isEdit = false, hww }: FormWebContentProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<hwwFormData>({
		resolver: zodResolver(hwwScheme),
		defaultValues: {
			title: hww?.title || '',
			content: hww?.content || '',
		},
	});

	const onSubmit = (form: hwwFormData) => {
		const formData = new FormData();
		formData.append('title', form.title);
		formData.append('content', form.content);

		if (isEdit && hww?.id) {
			formData.append('_method', 'PUT');
			router.post(`/dashboard/hww/${hww.id}`, formData, {
				forceFormData: true,
				onSuccess: () => {},
			});
		} else {
			router.post('/dashboard/hww', formData, {
				forceFormData: true,
			});
		}
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} How We Works`} />
			<AppWrapper>
				<h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} How We Works</h1>
				<Card>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
							<div>
								<label className="mb-1 block">
									Title <span className="text-red-500">*</span>
								</label>
								<Input type="text" {...register('title')} className={`form-control mt-2 ${errors.title ? 'border-red-500' : ''}`} />
								{errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
							</div>
							<div>
								<label className="mb-1 block">
									Content <span className="text-red-500">*</span>
								</label>
								<textarea
									rows={4}
									{...register('content')}
									className={`form-control mt-2 w-full rounded border px-3 py-2 ${
										errors.content ? 'border-red-500' : 'border-gray-300'
									}`}
								/>
								{errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
							</div>
							<Button type="submit">Submit</Button>
						</form>
					</CardContent>
				</Card>
			</AppWrapper>
		</AppLayout>
	);
}
