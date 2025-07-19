import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, Social, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

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

interface SocialsProps {
    socials: PaginatedResponse<Social>;
}

export default function Socials({ socials }: SocialsProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this social media?')) {
            router.delete(`/dashboard/socials/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Socials" />

            <div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {socials.data.length < 4 && (
                    <div className="flex w-full items-center justify-end">
                        <Link href="/dashboard/socials/create">
                            <Button>Create</Button>
                        </Link>
                    </div>
                )}

                <Card>
                    <CardContent>
                        <DataTable
                            columns={[
                                { header: 'Name', accessor: 'name', searchable: true },
                                { header: 'Link', accessor: 'link', searchable: true },
                                {
                                    header: 'Action',
                                    accessor: (row) => {
                                        return (
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/socials/${row.id}/edit`}>
                                                    <Button className="cursor-pointer" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button variant="destructive" onClick={() => handleDelete(row.id)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        );
                                    },
                                },
                            ]}
                            data={socials.data}
                            currentPage={socials.current_page}
                            totalPages={socials.last_page}
                            caption="List of socials"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
