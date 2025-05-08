import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { limitText } from '@/helpers/limit_text';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, WebContent, type BreadcrumbItem } from '@/types';
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
    web_contents: PaginatedResponse<WebContent>;
}

export default function TableWebContents({ web_contents }: TableWebContentsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Web Content" />

            <div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {web_contents.data.length < 3 && (
                    <div className="flex w-full items-center justify-end">
                        <Link href="/dashboard/web-contents/create">
                            <Button>Create</Button>
                        </Link>
                    </div>
                )}

                <Card>
                    <CardContent>
                        <DataTable
                            columns={[
                                { header: 'Title', accessor: 'title', searchable: true },
                                {
                                    header: 'Content',
                                    accessor: (row) => {
                                        return parse(limitText(String(row.content), 50));
                                    },
                                    searchable: true,
                                },
                                {
                                    header: 'Image',
                                    accessor: (row) => {
                                        return (
                                            row.image_url && <img src={row.image_url} alt={row.title} className="h-16 w-16 rounded-lg object-cover" />
                                        );
                                    },
                                },
                                { header: 'Section', accessor: 'section' },
                                {
                                    header: 'Action',
                                    accessor: (row) => {
                                        return (
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/web-contents/${row.id}/edit`}>
                                                    <Button className="cursor-pointer" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/web-contents/${row.id}/delete`}>
                                                    <Button className="cursor-pointer" variant="destructive">
                                                        Delete
                                                    </Button>
                                                </Link>
                                            </div>
                                        );
                                    },
                                },
                            ]}
                            data={web_contents.data}
                            currentPage={web_contents.current_page}
                            totalPages={web_contents.last_page}
                            caption="List of Web Contents"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
