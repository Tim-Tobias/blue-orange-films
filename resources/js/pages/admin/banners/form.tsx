import { AppWrapper } from '@/components/app-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Banner, CategorySection, type BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SyncLoader } from 'react-spinners';
import { z } from 'zod';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Banner',
        href: '/dashboard/banners',
    },
];

type FormBannerProps = {
    isEdit?: boolean;
    data?: Banner;
    sections: CategorySection[];
};

export const bannerScheme = z
    .object({
        title: z.string().min(1, 'Title is required'),
        section: z.string().min(1, 'Section is required'),
        banner: z.any(),    
        category: z.enum(['image', 'video'], {
            required_error: 'Category is required',
        }),
    })
    .superRefine((data, ctx) => {
    const isEdit = typeof window !== 'undefined' && window.location.href.includes('/edit');

    if (isEdit && !data.banner) {
        console.log('Skipping validation because editing and no new banner uploaded.');
        return;
    }

    if (data.category === 'video') {
        if (!data.banner || (typeof data.banner === 'string' && data.banner.trim() === '')) {
            ctx.addIssue({
                path: ['banner'],
                code: z.ZodIssueCode.custom,
                message: 'Video file is required',
            });
        }
    }

    if (data.category === 'image') {
        const isFile = data.banner instanceof File;
        const isString = typeof data.banner === 'string' && data.banner.length > 0;

        if (!isFile && !isString) {
            ctx.addIssue({
                path: ['banner'],
                code: z.ZodIssueCode.custom,
                message: 'Image is required',
            });
        }
    }
});


const SECTION_SECTIONS = ['home', 'about', 'works'];

export type BannerFormData = z.infer<typeof bannerScheme>;

export default function FormBanner({ isEdit = false, data, sections }: FormBannerProps) {
    const { errors: errorsBackend } = usePage().props;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [existingSections, setExistingSections] = useState<CategorySection[]>([]);
    const [image, setImage] = useState<File | null>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
        if (!data) return null;
        if (data.banner && typeof data.banner === 'string') {
            return `/storage/${data.banner}`;
        }
        if (data.image_url && typeof data.image_url === 'string') {
            return `/storage/${data.image_url}`;
        }

        return null;
    });

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<BannerFormData>({
        resolver: zodResolver(bannerScheme),
        defaultValues: {
            title: data?.title || '',
            section: data?.section || '',
            banner: data?.banner || '',
            category: data?.category || 'image',
        },
    });

    const onChange = (type: 'image' | 'video') => {
        setValue('category', type);
        setValue('banner', '');
        setImage(null);
        setPreviewUrl(null);
    };

    const onSubmit = (form: BannerFormData) => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('title', form.title || '');
        formData.append('section', form.section);
        formData.append('category', form.category);

        if (image instanceof File) {
            formData.append('banner', image);
        } else if (form.category === 'video') {
            formData.append('banner', form.banner);
        }

        if (isEdit && data?.id) {
            formData.append('_method', 'PUT');

            router.post(`/dashboard/banners/${data.id}`, formData, {
                forceFormData: true,
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        } else {
            router.post('/dashboard/banners', formData, {
                forceFormData: true,
                onFinish: () => {
                    setIsSubmitting(false);
                },
            });
        }
    };

    useEffect(() => {
        if (sections) {
            setExistingSections(sections);
        }
    }, [sections]);

    const usedSections = existingSections.map((item) => item.section);
    const availableSections = SECTION_SECTIONS.filter((section) => !usedSections.includes(section));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Admin Dashboard - ${isEdit ? 'Edit' : 'Create'} Banner`} />

            <AppWrapper>
                <h1 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Create'} Banner</h1>

                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
                            <div>
                                <label>Title</label>
                                <Input type="text" {...register('title')} className="form-control mt-2" />
                                {(errors.title || errorsBackend) && <p className="text-red-500">{errors.title?.message ?? errorsBackend.title}</p>}
                            </div>

                            {!data?.section && (
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
                                    {(errors.section || errorsBackend) && (
                                        <p className="text-red-500">{errors.section?.message ?? errorsBackend.section}</p>
                                    )}
                                </div>
                            )}

                            {/* Category */}
                            <RadioGroup
                                value={watch('category')}
                                onValueChange={(val: 'image' | 'video') => onChange(val)}
                                className="mb-4 flex gap-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="image" id="image" />
                                    <label htmlFor="image">Image</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="video" id="video" />
                                    <label htmlFor="video">Video</label>
                                </div>
                            </RadioGroup>

                            {/* Field Banner */}
                            {watch('category') === 'image' && previewUrl && (
                            <div>
                                <h6>Preview:</h6>
                                <img src={previewUrl} alt="Preview" className="h-32 w-32 rounded border object-cover" />
                            </div>
                            )}

                            {watch('category') === 'video' && previewUrl && (
                            <div>
                                <h6>Preview:</h6>
                                <video src={previewUrl} controls className="h-32 w-32 rounded border object-cover" />
                            </div>
                            )}

                            <div>
                            <label className="mb-1 block">Banner</label>
                            <Input
                                type="file"
                                accept={watch('category') === 'image' ? 'image/*' : 'video/*'}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                    setImage(file);
                                    setValue('banner', file);
                                    setPreviewUrl(URL.createObjectURL(file));
                                    }
                                }}
                                />
                            {(errors.banner || errorsBackend.banner) && <p className="text-sm text-red-500">{errorsBackend.banner}</p>}
                            </div>


                            <Button disabled={isSubmitting} type="submit">
                                {isSubmitting ? <SyncLoader size={10} color="#59b4c7" /> : 'submit'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </AppWrapper>
        </AppLayout>
    );
}
