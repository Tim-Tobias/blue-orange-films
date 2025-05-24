import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { limitText } from '@/helpers/limit_text';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, Banner, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import parse from 'html-react-parser';
import { router } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Banners',
        href: '/dashboard/banners',
    },
];

interface BannersProps {
    banners: PaginatedResponse<Banner>;
}

export default function Banners({ banners }: BannersProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Banner" />

            <div className="a a a flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {banners.data.length < 3 && (
                    <div className="flex w-full items-center justify-end">
                        <Link href="/dashboard/banners/create">
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
                                    header: 'Image',
                                    accessor: (row) => {
                                        if (row.category === 'image' && row.image_url) {
                                        return (
                                            <img
                                            src={row.image_url}
                                            alt={row.title}
                                            className="h-16 w-16 rounded-lg object-cover"
                                            />
                                        );
                                        } else if (row.category === 'video' && row.banner) {
                                        return (
                                            <a
                                            href={row.banner}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                            >
                                            Video Link
                                            </a>
                                        );
                                        }
                                        return null;
                                    },
                                },
                                { header: 'Section', accessor: 'section' },
                                {
                                    header: 'Action',
                                    accessor: (row) => {
                                        return (
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/banners/${row.id}/edit`}>
                                                    <Button className="cursor-pointer" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                    if (confirm('Are you sure to delete this banner?')) {
                                                        router.delete(`/dashboard/banners/${row.id}`);
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
                            data={banners.data}
                            currentPage={banners.current_page}
                            totalPages={banners.last_page}
                            caption="List of Banners"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
