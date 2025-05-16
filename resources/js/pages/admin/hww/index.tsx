import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, Social, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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

interface HwwProps {
	hww: PaginatedResponse<Social>;
}

export default function Hww({ hww }: HwwProps) {
	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Hww" />

			<div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
				{hww.data.length < 3 && (
					<div className="flex w-full items-center justify-end">
						<Link href="/dashboard/hww/create">
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
								{
									header: 'Action',
									accessor: (row) => {
										return (
											<div className="flex gap-2">
												<Link href={`/dashboard/hww/${row.id}/edit`}>
													<Button className="cursor-pointer" variant="outline">
														Edit
													</Button>
												</Link>
												<Link href={`/dashboard/hww/${row.id}/delete`}>
													<Button className="cursor-pointer" variant="destructive">
														Delete
													</Button>
												</Link>
											</div>
										);
									},
								},
							]}
							data={hww.data}
							currentPage={hww.current_page}
							totalPages={hww.last_page}
							caption="List of How We Works"
						/>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
