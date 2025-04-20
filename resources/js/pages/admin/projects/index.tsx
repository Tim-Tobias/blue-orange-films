import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Projects, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

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

interface TableProjectsProps {
    projects: Projects[];
}


export default function TableProjects({ projects }: TableProjectsProps) {
    const baseUrl = '/dashboard/projects';
    const { flash } = usePage().props;

    console.log("flash", JSON.stringify(flash));
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Web Content" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <div className="flex w-full items-center justify-end">
                    <Link href={`${baseUrl}/create`}>
                        <Button>Create</Button>
                    </Link>
                </div>

               <div className="w-full overflow-x-auto">
                    <Card className="min-w-full">
                        <CardContent className="p-0 sm:p-6">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableCaption>A list of your projects.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="whitespace-nowrap">Title</TableHead>
                                            <TableHead className="whitespace-nowrap">Year</TableHead>
                                            <TableHead className="whitespace-nowrap">Description</TableHead>
                                            <TableHead className="whitespace-nowrap">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projects.map((val, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{val.title}</TableCell>
                                                <TableCell>{val.year}</TableCell>
                                                <TableCell className="max-w-xs truncate">{val.description}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col sm:flex-row gap-2">
                                                        <Link href={`${baseUrl}/${val.id}/edit`} className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                                                            Edit
                                                        </Link>
                                                        <Link href={`${baseUrl}/${val.id}`} className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                                                            Detail
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
               </div>
            </div>
        </AppLayout>
    );
}
