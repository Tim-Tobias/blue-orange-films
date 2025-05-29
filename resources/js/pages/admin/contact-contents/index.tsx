import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, ContactContent, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Dashboard',
		href: '/dashboard',
	},
	{
		title: 'Contact Content',
		href: '/dashboard/contact-content',
	},
];

interface ContactContentProps {
	contactContent: PaginatedResponse<ContactContent>;
}

export default function Hww({ contactContent }: ContactContentProps) {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Contact Content" />

			<div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				{contactContent.data.length < 3 && (
					<div className="flex w-full items-center justify-end">
						<Link href="/dashboard/contact-content/create">
							<Button>Create</Button>
						</Link>
					</div>
				)}

				<Card>
					<CardContent>
						<DataTable
							columns={[
								{ header: 'Title', accessor: 'title', searchable: true },
								{ header: 'Content', accessor: 'content', searchable: true },
								{ header: 'Status', accessor: 'status_text', searchable: true },
								{
									header: 'Action',
									accessor: (row) => {
										return (
											<div className="flex gap-2">
												<Link href={`/dashboard/contact-content/${row.id}/edit`}>
													<Button className="cursor-pointer" variant="outline">
														Edit
													</Button>
												</Link>
												<Button
													variant="destructive"
													onClick={() => {
													if (confirm('Are you sure to delete this Data?')) {
														router.delete(`/dashboard/contact-content/${row.id}`);
													}
													}}
												>
													Delete
												</Button>
											</div>
										);
									},
								},
							]}
							data={contactContent.data}
							currentPage={contactContent.current_page}
							totalPages={contactContent.last_page}
							caption="List of Contact Content"
						/>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
