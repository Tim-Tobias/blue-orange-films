import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, Contact, ContactContent, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';


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

interface ContactsPageProps {
	contacts: PaginatedResponse<Contact>;
	contactContent: PaginatedResponse<ContactContent>;
}

export default function Contacts({ contacts, contactContent }: ContactsPageProps) {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Contact" />

			<div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<div className="flex w-full items-center justify-between px-2">
					<h2 className="text-2xl font-semibold">Contact</h2>
					{contacts.data.length < 3 && (
					<Link href="/dashboard/contacts/create">
						<Button>Create</Button>
					</Link>
					)}
				</div>

				<Card>
					<CardContent>
						<DataTable
							columns={[
								{ header: 'Phone', accessor: 'phone', searchable: true },
								{ header: 'Email', accessor: 'email', searchable: true },
								{ header: 'Address', accessor: 'address', searchable: true },
								{ header: 'Status', accessor: 'status_text', searchable: true },
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
												<Button
													variant="destructive"
													onClick={() => {
													if (confirm('Are you sure to delete this Data?')) {
														router.delete(`/dashboard/contacts/${row.id}`);
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
							data={contacts.data}
							currentPage={contacts.current_page}
							totalPages={contacts.last_page}
							caption="List of contacts"
						/>
					</CardContent>
				</Card>
			</div>

			<div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				<div className="flex w-full items-center justify-between px-2">
					<h2 className="text-2xl font-semibold">Contact Content</h2>
					{contactContent.data.length < 3 && (
					<Link href="/dashboard/contact-content/create">
						<Button>Create</Button>
					</Link>
					)}
				</div>

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
