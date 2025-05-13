import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, Contact, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Dashboard',
		href: '/dashboard',
	},
	{
		title: 'Contact',
		href: '/dashboard/contact',
	},
];

interface ContactsProps {
	contacts: PaginatedResponse<Contact>;
}

export default function Contacts({ contacts }: ContactsProps) {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Contact" />

			<div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				{contacts.data.length < 3 && (
					<div className="flex w-full items-center justify-end">
						<Link href="/dashboard/contacts/create">
							<Button>Create</Button>
						</Link>
					</div>
				)}

				<Card>
					<CardContent>
						<DataTable
							columns={[
								{ header: 'Phone', accessor: 'phone', searchable: true },
								{ header: 'Email', accessor: 'email', searchable: true },
								{ header: 'Address', accessor: 'address', searchable: true },
								{
									header: 'Action',
									accessor: (row) => {
										return (
											<div className="flex gap-2">
												<Link href={`/dashboard/contacts/${row.id}/edit`}>
													<Button className="cursor-pointer" variant="outline">
														Edit
													</Button>
												</Link>
												<Link href={`/dashboard/contacts/${row.id}/delete`}>
													<Button className="cursor-pointer" variant="destructive">
														Delete
													</Button>
												</Link>
											</div>
										);
									},
								},
							]}
							data={contacts.data}
							currentPage={contacts.current_page}
							totalPages={contacts.last_page}
							caption="List of contacts"
						/>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
