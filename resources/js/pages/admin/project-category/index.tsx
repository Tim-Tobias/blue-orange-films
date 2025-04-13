import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { ProjectCategory, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Project Category',
        href: '/dashboard/project-category',
    },
];

interface TableWebContentsProps {
    projectCategory: ProjectCategory[];
}

export default function TableWebContents({ projectCategory }: TableWebContentsProps) {


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project Category" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full items-center justify-end">
                    <Link href="/dashboard/project-category/create">
                        <Button>Create</Button>
                    </Link>
                </div>

                <Card>
                    <CardContent>
                        <Table>
                            <TableCaption>A list of your project category.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='w-[50%]'>Name</TableHead>
                                    <TableHead className="w-[50%]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {projectCategory.map((val, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{val.name}</TableCell>
                                        <TableCell>
                                            <Link href={`/dashboard/project-category/${val.id}/edit`}>
                                                <Button>Edit</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
