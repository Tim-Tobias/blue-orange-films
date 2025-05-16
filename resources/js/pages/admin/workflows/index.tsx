import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ImageNotFound from '@/images/Image-not-found.png';
import AppLayout from '@/layouts/app-layout';
import { PaginatedResponse, WebContent, Workflow, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { SyncLoader } from 'react-spinners';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Workflows',
        href: '/dashboard/workflows',
    },
];

interface TableWorkflowsProps {
    workflows: PaginatedResponse<Workflow>;
    webContent: WebContent;
}

export default function TableWebContents({ workflows, webContent }: TableWorkflowsProps) {
    const { errors } = usePage().props;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(webContent.image_url ?? ImageNotFound);
    const [background, setBackground] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBackground(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();

        if (background instanceof File) {
            formData.append('background', background);
        }

        formData.append('_method', 'PATCH');

        router.post(`/dashboard/workflows/background`, formData, {
            forceFormData: true,
            onFinish: () => {
                setIsSubmitting(false);
                router.flushAll();
            },
        });

        setBackground(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Workflows" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="w-fit">
                    <CardContent>
                        {previewUrl && <img src={previewUrl} alt="Preview" className="mb-5 h-32 w-32 object-cover" />}

                        <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data" method="POST">
                            <div className="mb-3">
                                <label>Background</label>
                                <Input
                                    onError={() => setPreviewUrl(ImageNotFound)}
                                    type="file"
                                    onChange={handleImageChange}
                                    className="form-control mt-2"
                                    accept="image/svg+xml"
                                />
                                {errors?.background && <p className="text-red-500">{errors.background}</p>}
                            </div>

                            <Button disabled={isSubmitting} type="submit">
                                {isSubmitting ? <SyncLoader size={10} color="#59b4c7" /> : 'submit'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="flex w-full items-center justify-end">
                    <Link href="/dashboard/workflows/create">
                        <Button>Create</Button>
                    </Link>
                </div>

                <Card>
                    <CardContent>
                        <DataTable
                            columns={[
                                { header: 'Title', accessor: 'title', searchable: true },
                                { header: 'Desc', accessor: 'desc', searchable: true },
                                { header: 'Order', accessor: 'order', sortable: true },
                                {
                                    header: 'Action',
                                    accessor: (row) => {
                                        return (
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/workflows/${row.id}/edit`}>
                                                    <Button className="cursor-pointer" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/workflows/${row.id}/delete`}>
                                                    <Button className="cursor-pointer" variant="destructive">
                                                        Delete
                                                    </Button>
                                                </Link>
                                            </div>
                                        );
                                    },
                                },
                            ]}
                            data={workflows.data}
                            currentPage={workflows.current_page}
                            totalPages={workflows.last_page}
                            caption="List of Workflows"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
