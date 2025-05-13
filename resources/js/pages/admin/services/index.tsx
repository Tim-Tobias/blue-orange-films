import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { limitText } from '@/helpers/limit_text';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, Service, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import parse from 'html-react-parser';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Service',
        href: '/dashboard/services',
    },
];

interface ServiceProps {
    services: PaginatedResponse<Service>;
}

export default function services({ services }: ServiceProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Service" />

            <div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {services.data.length < 3 && (
                    <div className="flex w-full items-center justify-end">
                        <Link href="/dashboard/services/create">
                            <Button>Create</Button>
                        </Link>
                    </div>
                )}

                <Card>
                    <CardContent>
                        <DataTable
                            columns={[
                                {
                                    header: 'Image',
                                    accessor: (row) => {
                                        return (
                                            row.image_url && <img src={row.image_url} alt={row.title} className="h-16 w-16 rounded-lg object-cover" />
                                        );
                                    },
                                },
                                { header: 'Title', accessor: 'title', searchable: true },
                                { header: 'Description', accessor: 'description', searchable: true },
                                {
                                    header: 'Action',
                                    accessor: (row) => {
                                        return (
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/services/${row.id}/edit`}>
                                                    <Button className="cursor-pointer" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/services/${row.id}/delete`}>
                                                    <Button className="cursor-pointer" variant="destructive">
                                                        Delete
                                                    </Button>
                                                </Link>
                                            </div>
                                        );
                                    },
                                },
                            ]}
                            data={services.data}
                            currentPage={services.current_page}
                            totalPages={services.last_page}
                            caption="List of Services"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
