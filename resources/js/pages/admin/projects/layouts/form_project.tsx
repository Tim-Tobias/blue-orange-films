import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectCategory } from '@/types';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Editor from 'react-simple-wysiwyg';
import { ProjectFormData } from '../form';

interface ProjectFormProps {
    categories: ProjectCategory[];
    form: UseFormReturn<ProjectFormData>;
}

export default function ProjectForm({ categories, form }: ProjectFormProps) {
    const [highlightType, setHighlightType] = useState<'photo' | 'video'>('photo');

    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = form;

    return (
        <Card>
            <CardHeader className="text-xl font-semibold">Project Data</CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Title" {...register('title')} />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

                <Input placeholder="Year" {...register('year')} />
                {errors.year && <p className="text-sm text-red-500">{errors.year.message}</p>}

                <Input placeholder="Duration" {...register('duration')} />
                {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}

                <Input placeholder="Aspect Ratio" {...register('aspect_ratio')} />
                {errors.aspect_ratio && <p className="text-sm text-red-500">{errors.aspect_ratio.message}</p>}

                <Select onValueChange={(val) => setValue('category', val)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((c) => (
                            <SelectItem key={c.id} value={String(c.id)}>
                                {c.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}

                <div>
                    <label className="mb-1 block font-medium">Description</label>
                    <Editor value={watch('description') || ''} onChange={(e) => setValue('description', e.target.value)} />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="mb-1 block font-medium">Highlight Type</label>
                    <RadioGroup defaultValue="photo" onValueChange={(val) => setHighlightType(val as 'photo' | 'video')} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="photo" id="highlight-photo" />
                            <label htmlFor="highlight-photo">Upload Photo</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="video" id="highlight-video" />
                            <label htmlFor="highlight-video">YouTube Link</label>
                        </div>
                    </RadioGroup>
                </div>

                {highlightType === 'photo' ? (
                    <div>
                        <label className="mb-1 block">Upload Image</label>
                        <Input type="file" accept="image/*" {...register('highlight_video')} />
                    </div>
                ) : (
                    <Input type="text" placeholder="YouTube Link" {...register('highlight_video')} />
                )}
            </CardContent>
        </Card>
    );
}
