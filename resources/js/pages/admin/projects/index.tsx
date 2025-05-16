import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PaginatedResponse, Project } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Projects',
        href: '/dashboard/projects',
    },
];

interface ProjectProps {
    projects: PaginatedResponse<Project>;
}

const Projects = ({ projects }: ProjectProps) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full items-center justify-end">
                    <Link href="/dashboard/projects/create">
                        <Button>Create</Button>
                    </Link>
                </div>

                <Card>
                    <CardContent>
                        <DataTable
                            columns={[
                                { header: 'Title', accessor: 'title', searchable: true },
                                { header: 'Year', accessor: 'year', sortable: true },
                                { header: 'Client', accessor: 'client' },
                                { header: 'Agency', accessor: 'agency' },
                                { header: 'Category', accessor: (row) => row.category?.name },
                                { header: 'Duration', accessor: 'duration' },
                                { header: 'Aspect Ration', accessor: 'aspect_ratio' },
                                {
                                    header: 'Action',
                                    accessor: (row) => (
                                        <div className="flex gap-2">
                                            <Link href={`/dashboard/projects/${row.id}/edit`}>
                                                <Button variant="outline">Edit</Button>
                                            </Link>
                                            <Link href={`/dashboard/projects/${row.id}/delete`}>
                                                <Button variant="destructive">Delete</Button>
                                            </Link>
                                        </div>
                                    ),
                                },
                            ]}
                            data={projects.data}
                            currentPage={projects.current_page}
                            totalPages={projects.last_page}
                            caption="List of Projects"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Projects;
