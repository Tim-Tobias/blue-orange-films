import Player from '@/components/player';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project, ProjectCategory } from '@/types';
import { usePage } from '@inertiajs/react';
import { UseFormReturn } from 'react-hook-form';
import Editor from 'react-simple-wysiwyg';
import { ProjectFormData } from '../form';

import DatePicker from 'react-datepicker';

import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

interface ProjectFormProps {
    categories: ProjectCategory[];
    isEdit: boolean;
    project?: Project;
    form: UseFormReturn<ProjectFormData>;
}

export default function ProjectForm({ categories, form, isEdit, project }: ProjectFormProps) {
    const { errors: inertiaErrors } = usePage().props;
    const [startDate, setStartDate] = useState(new Date());

    const {
        register,
        setValue,
        watch,
        formState: { errors: hookErrors },
    } = form;

    const errorText = (key: string) => {
        const hookError = hookErrors[key as keyof typeof hookErrors];
        if (hookError && typeof hookError.message === 'string') {
            return hookError.message;
        }
        const inertiaError = inertiaErrors[key];
        if (typeof inertiaError === 'string') {
            return inertiaError;
        }
        return undefined;
    };

    const changeDate = (date: Date) => {
        setStartDate(date);
        setValue('date', date.toISOString().split('T')[0]);
    };

    return (
        <Card>
            <CardHeader className="text-xl font-semibold">Project Data</CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Input placeholder="Title" {...register('title')} />
                    {errorText('title') && <p className="text-sm text-red-500">{errorText('title')}</p>}
                </div>

                <div className="w-full">
                    <DatePicker
                        className="w-full border p-2"
                        wrapperClassName="w-full"
                        calendarClassName="w-full"
                        popperProps={{
                            placement: 'bottom-start',
                        }}
                        selected={startDate}
                        onChange={(date) => date && changeDate(date)}
                    />
                    {errorText('date') && <p className="text-sm text-red-500">{errorText('date')}</p>}
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
                    <label className="mb-1 block">{isEdit ? 'Edit' : 'Upload'} Image</label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setValue('highlight_image', file);
                        }}
                    />
                    {errorText('highlight_image') && <p className="text-sm text-red-500">{errorText('highlight_image')}</p>}
                </div>

                <div>
                    <label className="mb-1 block">{isEdit ? 'Edit' : 'Upload'} Youtube Link</label>
                    <Input type="text" placeholder="YouTube Link" {...register('highlight')} />
                    {errorText('highlight') && <p className="text-sm text-red-500">{errorText('highlight')}</p>}
                </div>

                {isEdit && (
                    <div className="flex gap-3">
                        <img
                            src={
                                watch('highlight_image') instanceof File
                                    ? URL.createObjectURL(watch('highlight_image')!)
                                    : String(project?.highlight_image_url)
                            }
                            alt=""
                            className="h-[200px] w-[200px]"
                        />

                        <div className="h-[200px] w-[200px]">
                            <Player url={String(watch('highlight')) || String(project?.highlight_link)} />{' '}
                        </div>
                        {errorText('highlight') && <p className="text-sm text-red-500">{errorText('highlight')}</p>}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
