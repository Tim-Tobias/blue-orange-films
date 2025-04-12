import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { ProjectCategory, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Web Content',
        href: '/dashboard/project-category',
    },
];

interface TableWebContentsProps {
    projectCategory: ProjectCategory[];
}

export default function TableWebContents({ projectCategory }: TableWebContentsProps) {

    // const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/project-category/datatable', {
                method: 'POST',
                body: JSON.stringify({
                    page: 1,
                    limit: 10
                })
            });
            
            const data = await response.json();
            console.log('Success:', data);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project Category" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {projectCategory.length < 3 && (
                    <div className="flex w-full items-center justify-end">
                        <Link href="/dashboard/project-category/create">
                            <Button>Create</Button>
                        </Link>
                    </div>
                )}

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
