import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ImageNotFound from '@/images/Image-not-found.png';
import AppLayout from '@/layouts/app-layout';
import { WebContent, Workflow, type BreadcrumbItem } from '@/types';
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
    workflows: Workflow[];
    webContent: WebContent;
}

export default function TableWebContents({ workflows, webContent }: TableWorkflowsProps) {
    const { errors } = usePage().props;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(webContent.image_url ?? ImageNotFound);
    const [background, setBackground] = useState<File | null>(null);

    const handleDelete = (id: number) => {
        router.delete(`/dashboard/workflows/${id}`);
    };

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
                        <Table>
                            <TableCaption>A list of your web contents.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Desc</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {workflows.map((val, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{val.title}</TableCell>
                                        <TableCell>{val.desc}</TableCell>
                                        <TableCell>{val.order}</TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/dashboard/workflows/${val.id}/edit`}>
                                                <Button>Edit</Button>
                                            </Link>
                                            <Button className="ml-3 bg-red-500 text-white hover:bg-red-600" onClick={() => handleDelete(val.id)}>
                                                Delete
                                            </Button>
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
