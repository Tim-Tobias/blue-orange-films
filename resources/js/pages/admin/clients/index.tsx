import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { limitText } from '@/helpers/limit_text';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, Client, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import parse from 'html-react-parser';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Client',
        href: '/dashboard/clients',
    },
];

interface ClientProps {
    clients: PaginatedResponse<Client>;
}

export default function Clients({ clients }: ClientProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client" />

            <div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {clients.data.length < 3 && (
                    <div className="flex w-full items-center justify-end">
                        <Link href="/dashboard/clients/create">
                            <Button>Create</Button>
                        </Link>
                    </div>
                )}

                <Card>
                    <CardContent>
                        <DataTable
                            columns={[
                                { header: 'Name', accessor: 'name', searchable: true },
                                {
                                    header: 'Image',
                                    accessor: (row) => {
                                        return (
                                            row.image_url && <img src={row.image_url} alt={row.name} className="h-16 w-16 rounded-lg object-cover" />
                                        );
                                    },
                                },
                                {
                                    header: 'Action',
                                    accessor: (row) => {
                                        return (
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/clients/${row.id}/edit`}>
                                                    <Button className="cursor-pointer" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/clients/${row.id}/delete`}>
                                                    <Button className="cursor-pointer" variant="destructive">
                                                        Delete
                                                    </Button>
                                                </Link>
                                            </div>
                                        );
                                    },
                                },
                            ]}
                            data={clients.data}
                            currentPage={clients.current_page}
                            totalPages={clients.last_page}
                            caption="List of Clients"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
