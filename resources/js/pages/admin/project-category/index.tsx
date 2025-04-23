import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { ProjectCategory, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';



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


interface TableProjectCategoryProps {
    projectCategory: ProjectCategory[];
}

export default function TableProjectCategory({ projectCategory }: TableProjectCategoryProps) {
    const props = usePage().props;


    console.log("All props:", props);
    // atau lebih spesifik
    console.log("Flash messages:", props.flash);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project Category" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full items-center justify-between">
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-8"
                            value={""}
                        />
                    </div>
                    <Link href="/dashboard/project-category/create">
                        <Button>Create</Button>
                    </Link>
                </div>

                <Card>
                    <CardContent>
                        <Table>
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
                <div className="max-w-3xl mx-auto p-4">
                    <Pagination totalPages={10} initialPage={1} onPageChange={(page) => console.log(`Page changed to ${page}`)} />
                </div>
            </div>
        </AppLayout>
    );
}
