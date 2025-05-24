import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, ProjectCategory, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Project Category',
        href: '/dashboard/project-categories',
    },
];

interface TableProjectCategoryProps {
    projectCategories: PaginatedResponse<ProjectCategory>;
}

export default function TableProjectCategory({ projectCategories }: TableProjectCategoryProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project Category" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full items-center justify-between">
                    <div className="relative w-64">
                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
                        <Input type="search" placeholder="Search..." className="pl-8" value={''} />
                    </div>
                    <Link href="/dashboard/project-categories/create">
                        <Button>Create</Button>
                    </Link>
                </div>

                <Card>
                    <CardContent>
                        <DataTable
                            columns={[
                                { header: 'Name', accessor: 'name', searchable: true },
                                {
                                    header: 'Action',
                                    accessor: (row) => {
                                        return (
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/project-categories/${row.id}/edit`}>
                                                    <Button className="cursor-pointer" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                    if (confirm('Are you sure to delete this Data?')) {
                                                        router.delete(`/dashboard/project-categories/${row.id}`);
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
                            data={projectCategories.data}
                            currentPage={projectCategories.current_page}
                            totalPages={projectCategories.last_page}
                            caption="List of Workflows"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
