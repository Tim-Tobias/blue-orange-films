import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { CategorySection, WebContent, type BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Editor, { ContentEditableEvent } from 'react-simple-wysiwyg';
import { z } from 'zod';

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

type FormWebContentProps = {
    isEdit?: boolean;
    data?: WebContent;
    categories: CategorySection[];
};

export const webContentScheme = z.object({
    title: z.string().optional(),
    section: z.string().min(1, 'Section is required'),
});

const SECTION_CATEGORIES = ['home', 'service', 'contact'];

export type WebContentFormData = z.infer<typeof webContentScheme>;

export default function FormWebContent({ isEdit = false, data, categories }: FormWebContentProps) {
    const [content, setContent] = useState(data?.content || '');
    const [existingCategories, setExistingCategories] = useState<CategorySection[]>([]);
    const [image, setImage] = useState<File | null>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(data?.image || null);

    function onChange(e: ContentEditableEvent) {
        setContent(e.target.value);
    }

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<WebContentFormData>({
        resolver: zodResolver(webContentScheme),
        defaultValues: {
            title: data?.title || '',
            section: data?.section || '',
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmit = (form: WebContentFormData) => {
        const formData = new FormData();
        formData.append('title', form.title || '');
        formData.append('section', form.section);
        formData.append('content', content || '');

        if (image instanceof File) {
            formData.append('image', image);
        }

        if (isEdit && data?.id) {
            formData.append('_method', 'PUT');

            router.post(`/dashboard/web-contents/${data.id}`, formData, {
                forceFormData: true,
                onSuccess: () => {},
            });
        } else {
            router.post('/dashboard/web-contents', formData, {
                forceFormData: true,
            });
        }
    };

    useEffect(() => {
        if (data?.content) {
            setContent(data.content);
        }
    }, [data]);

    useEffect(() => {
        if (categories) {
            setExistingCategories(categories);
        }
    }, [categories]);

    const usedSections = existingCategories.map((item) => item.section);
    const availableSections = SECTION_CATEGORIES.filter((section) => !usedSections.includes(section));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} Web Content`} />

            <AppWrapper>
                <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Web Content</h1>

                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
                            <div>
                                <label>Title</label>
                                <Input type="text" {...register('title')} className="form-control mt-2" />
                                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label>Content</label>
                                <Editor value={content} onChange={onChange}></Editor>
                                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                            </div>

                            {!data?.section ? (
                                <div>
                                    <label>Section</label>
                                    <Select onValueChange={(val) => setValue('section', val)} name="section">
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Select a section" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableSections.map((val, index) => (
                                                <SelectItem key={index} value={val}>{`${val} section`}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.section && <p className="text-red-500">{errors.section.message}</p>}
                                </div>
                            ) : (
                                <Input type="hidden" {...register('section')} className="form-control mt-2" />
                            )}

                            {previewUrl && (
                                <div className="space-y-2">
                                    <h6>Preview:</h6>
                                    <img src={previewUrl} alt="Preview" className="h-32 w-32 object-cover" />
                                </div>
                            )}

                            <div>
                                <label>File</label>
                                <Input type="file" onChange={handleImageChange} className="form-control mt-2" accept="image/*" />
                            </div>

                            <Button type="submit">Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            </AppWrapper>
        </AppLayout>
    );
}
