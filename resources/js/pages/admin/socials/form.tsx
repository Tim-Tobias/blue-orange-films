import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Social } from '@/types';
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
		title: 'Social',
		href: '/dashboard/socials',
	},
];

type FormWebContentProps = {
	isEdit?: boolean;
	social?: Social;
};

export const socialScheme = z.object({
	name: z.string().min(1, { message: 'Social Name is required' }),
	link: z.string().min(1, { message: 'Social Link is required' }),
});

export type socialFormData = z.infer<typeof socialScheme>;

export default function FormWebContent({ isEdit = false, social }: FormWebContentProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<socialFormData>({
		resolver: zodResolver(socialScheme),
		defaultValues: {
			name: social?.name || '',
			link: social?.link || '',
		},
	});

	const onSubmit = (form: socialFormData) => {
		const formData = new FormData();
		formData.append('name', form.name);
		formData.append('link', form.link);

		if (isEdit && social?.id) {
			formData.append('_method', 'PUT');
			router.post(`/dashboard/socials/${social.id}`, formData, {
				forceFormData: true,
				onSuccess: () => {},
			});
		} else {
			router.post('/dashboard/socials', formData, {
				forceFormData: true,
			});
		}
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} Socials`} />
			<AppWrapper>
				<h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Social</h1>
				<Card>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
							<div>
								<label className="mb-1 block">
									Name <span className="text-red-500">*</span>
								</label>
								<Input type="text" {...register('name')} className={`form-control mt-2 ${errors.name ? 'border-red-500' : ''}`} />
								{errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
							</div>
							<div>
								<label className="mb-1 block">
									Link <span className="text-red-500">*</span>
								</label>
								<Input type="text" {...register('link')} className={`form-control mt-2 ${errors.link ? 'border-red-500' : ''}`} />
								{errors.link && <p className="mt-1 text-sm text-red-500">{errors.link.message}</p>}
							</div>
							<Button type="submit">Submit</Button>
						</form>
					</CardContent>
				</Card>
			</AppWrapper>
		</AppLayout>
	);
}
