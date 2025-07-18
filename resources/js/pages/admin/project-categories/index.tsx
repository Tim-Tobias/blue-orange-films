import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, ProjectCategory, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';

import { toast } from 'sonner';
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
    const deleteProjectCategory = (id: number) => {
        router.delete(`/dashboard/project-categories/${id}`, {
            onSuccess: () => {
                toast.success('Project category deleted successfully');
            },
            onError: () => {
                toast.error('Failed to delete project category');
            },
        });
    };
    const { props } = usePage<{ flash: { error?: string; success?: string } }>();
    const flashError = props.flash?.error;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project Category" />

            {flashError && <div className="rounded-lg bg-red-100 p-3 text-sm text-red-800">{flashError}</div>}

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
                                                <Button variant="destructive" onClick={() => deleteProjectCategory(row.id)}>
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
