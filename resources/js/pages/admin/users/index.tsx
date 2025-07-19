import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, User, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users',
        href: '/dashboard/users',
    },
];

interface UsersProps {
    users: PaginatedResponse<User>;
}

export default function Users({ users }: UsersProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/dashboard/users/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full items-center justify-end">
                    <Link href="/dashboard/users/create">
                        <Button>Create</Button>
                    </Link>
                </div>

                <Card>
                    <CardContent>
                        <DataTable
                            columns={[
                                { header: 'Name', accessor: 'name', searchable: true },
                                { header: 'Email', accessor: 'email', searchable: true },
                                { header: 'Role', accessor: 'role', searchable: true },
                                {
                                    header: 'Action',
                                    accessor: (row) => {
                                        return (
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/users/${row.id}/edit`}>
                                                    <Button variant="outline">Edit</Button>
                                                </Link>
                                                <Button variant="destructive" onClick={() => handleDelete(row.id)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        );
                                    },
                                },
                            ]}
                            data={users.data}
                            currentPage={users.current_page}
                            totalPages={users.last_page}
                            caption="List of users"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
