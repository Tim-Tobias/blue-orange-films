import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { limitText } from '@/helpers/limit_text';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, ContactCarousell, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import parse from 'html-react-parser';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Contact Carousell',
        href: '/dashboard/contact-carousell',
    },
];

interface ContactCarousellProps {
    carousell: PaginatedResponse<ContactCarousell>;
}

export default function carousell({ carousell }: ContactCarousellProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Service" />

            <div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {carousell.data.length < 3 && (
                    <div className="flex w-full items-center justify-end">
                        <Link href="/dashboard/contact-carousell/create">
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
                                {
                                    header: 'Action',
                                    accessor: (row) => {
                                        return (
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/contact-carousell/${row.id}/edit`}>
                                                    <Button className="cursor-pointer" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/contact-carousell/${row.id}/delete`}>
                                                    <Button className="cursor-pointer" variant="destructive">
                                                        Delete
                                                    </Button>
                                                </Link>
                                            </div>
                                        );
                                    },
                                },
                            ]}
                            data={carousell.data}
                            currentPage={carousell.current_page}
                            totalPages={carousell.last_page}
                            caption="List of Carousell"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
