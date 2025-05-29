import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, Workflow, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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

interface TableWorkflowsProps {
    workflows: PaginatedResponse<Workflow>;
}

export default function TableWebContents({ workflows }: TableWorkflowsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Workflows" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full items-center justify-end">
                    <Link href="/dashboard/workflows/create">
                        <Button>Create</Button>
                    </Link>
                </div>

                <Card>
                    <CardContent>
                        <DataTable
                            columns={[
                                { header: 'Title', accessor: 'title', searchable: true },
                                { header: 'Desc', accessor: 'desc', searchable: true },
                                { header: 'Order', accessor: 'order', sortable: true },
                                {
                                    header: 'Action',
                                    accessor: (row) => {
                                        return (
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/workflows/${row.id}/edit`}>
                                                    <Button className="cursor-pointer" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/workflows/${row.id}/delete`}>
                                                    <Button className="cursor-pointer" variant="destructive">
                                                        Delete
                                                    </Button>
                                                </Link>
                                            </div>
                                        );
                                    },
                                },
                            ]}
                            data={workflows.data}
                            currentPage={workflows.current_page}
                            totalPages={workflows.last_page}
                            caption="List of Workflows"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
