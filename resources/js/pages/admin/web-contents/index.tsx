import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { limitText } from '@/helpers/limit_text';
import AppLayout from '@/layouts/app-layout';
import { WebContent, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import parse from 'html-react-parser';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Web Content',
        href: '/dashboard/web-contents',
    },
];

interface TableWebContentsProps {
    web_contents: WebContent[];
}

export default function TableWebContents({ web_contents }: TableWebContentsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Web Content" />

            <div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {web_contents.length < 3 && (
                    <div className="flex w-full items-center justify-end">
                        <Link href="/dashboard/web-contents/create">
                            <Button>Create</Button>
                        </Link>
                    </div>
                )}

                <Card>
                    <CardContent>
                        <Table>
                            <TableCaption>A list of your web contents.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Content</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead className="text-right">Section</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {web_contents.map((val, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{val.title}</TableCell>
                                        <TableCell>{parse(limitText(String(val.content), 50))}</TableCell>
                                        <TableCell>{val.image_url && <img style={{ width: '100px' }} src={val.image_url} alt="" />}</TableCell>
                                        <TableCell className="text-right">{val.section} section</TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/dashboard/web-contents/${val.id}/edit`}>
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
