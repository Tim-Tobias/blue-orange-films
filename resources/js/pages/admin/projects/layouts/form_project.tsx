import Player from '@/components/player';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project, ProjectCategory } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Editor from 'react-simple-wysiwyg';
import { ProjectFormData } from '../form';

interface ProjectFormProps {
    categories: ProjectCategory[];
    isEdit: boolean;
    project?: Project;
    form: UseFormReturn<ProjectFormData>;
}

export default function ProjectForm({ categories, form, isEdit, project }: ProjectFormProps) {
    const { errors: inertiaErrors } = usePage().props;

    const {
        register,
        setValue,
        watch,
        formState: { errors: hookErrors },
    } = form;

    const [highlightType, setHighlightType] = useState<'image' | 'video'>(watch('highlight_type') || 'image');

    const handleChangeType = (type: 'image' | 'video') => {
        setHighlightType(type);
        setValue('highlight', '');
        setValue('highlight_type', type);
    };

    const errorText = (key: string) => hookErrors[key as keyof typeof hookErrors]?.message || inertiaErrors[key];

    return (
        <Card>
            <CardHeader className="text-xl font-semibold">Project Data</CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Input placeholder="Title" {...register('title')} />
                    {errorText('title') && <p className="text-sm text-red-500">{errorText('title')}</p>}
                </div>

                <div>
                    <Input placeholder="Year" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" type="number" {...register('year')} />
                    {errorText('year') && <p className="text-sm text-red-500">{errorText('year')}</p>}
                </div>

                <div>
                    <Input placeholder="Client" {...register('client')} />
                    {errorText('client') && <p className="text-sm text-red-500">{errorText('client')}</p>}
                </div>

                <div>
                    <Input placeholder="Duration" {...register('duration')} />
                    {errorText('duration') && <p className="text-sm text-red-500">{errorText('duration')}</p>}
                </div>

                <div>
                    <Input placeholder="Aspect Ratio" {...register('aspect_ratio')} />
                    {errorText('aspect_ratio') && <p className="text-sm text-red-500">{errorText('aspect_ratio')}</p>}
                </div>

                <div>
                    <Select onValueChange={(val) => setValue('category', val)} value={String(watch('category'))}>
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
                    {errorText('category') && <p className="text-sm text-red-500">{errorText('category')}</p>}
                </div>

                <div>
                    <label className="mb-1 block font-medium">Description</label>
                    <Editor value={watch('description') || ''} onChange={(e) => setValue('description', e.target.value)} />
                    {errorText('description') && <p className="text-sm text-red-500">{errorText('description')}</p>}
                </div>

                <div>
                    <label className="mb-1 block font-medium">Highlight Type</label>
                    <RadioGroup value={highlightType} onValueChange={(val) => handleChangeType(val as 'image' | 'video')} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="image" id="highlight-photo" />
                            <label htmlFor="highlight-photo">Upload Photo</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="video" id="highlight-video" />
                            <label htmlFor="highlight-video">YouTube Link</label>
                        </div>
                    </RadioGroup>
                    {errorText('highlight_type') && <p className="text-sm text-red-500">{errorText('highlight')}</p>}
                </div>

                <div>
                    {highlightType === 'image' ? (
                        <>
                            <label className="mb-1 block">{isEdit ? 'Edit' : 'Upload'} Image</label>
                            <Input type="file" accept="image/*" onChange={(e) => setValue('highlight', e.target.files?.[0] ?? '')} />
                        </>
                    ) : (
                        <Input type="text" placeholder="YouTube Link" {...register('highlight')} />
                    )}
                    {errorText('highlight') && <p className="text-sm text-red-500">{errorText('highlight')}</p>}
                </div>

                {isEdit && (
                    <div>
                        {highlightType === 'image' ? (
                            <img
                                src={
                                    typeof watch('highlight') === 'object'
                                        ? URL.createObjectURL(watch('highlight') as File)
                                        : String(project?.highlight_url)
                                }
                                alt=""
                                className="h-[200px] w-[200px]"
                            />
                        ) : (
                            <div className="h-[200px] w-[200px]">
                                <Player url={String(watch('highlight')) || String(project?.highlight_link)} />{' '}
                            </div>
                        )}
                        {errorText('highlight') && <p className="text-sm text-red-500">{errorText('highlight')}</p>}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
