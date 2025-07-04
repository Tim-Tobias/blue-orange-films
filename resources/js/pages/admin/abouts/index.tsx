import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { limitText } from '@/helpers/limit_text';
import AppLayout from '@/layouts/app-layout';
import { About, PaginatedResponse, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'About',
        href: '/dashboard/abouts',
    },
];

interface AboutProps {
    abouts: PaginatedResponse<About>;
}

export default function Abouts({ abouts }: AboutProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About" />

            <div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {abouts.data.length < 3 && (
                    <div className="flex w-full items-center justify-end">
                        <Link href="/dashboard/abouts/create">
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
                                        return row.image_url && <img src={row.image_url} alt="About" className="h-16 w-16 rounded-lg object-cover" />;
                                    },
                                },
                                {
                                    header: 'Content',
                                    accessor: (row) => {
                                        return limitText(row.content || '', 150);
                                    },
                                    searchable: true,
                                },
                                { header: 'Status', accessor: 'status_text', searchable: true },
                                {
                                    header: 'Action',
                                    accessor: (row) => {
                                        return (
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/abouts/${row.id}/edit`}>
                                                    <Button className="cursor-pointer" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                        if (confirm('Are you sure to delete this abouts?')) {
                                                            router.delete(`/dashboard/abouts/${row.id}`);
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
                            data={abouts.data}
                            currentPage={abouts.current_page}
                            totalPages={abouts.last_page}
                            caption="List of About"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
