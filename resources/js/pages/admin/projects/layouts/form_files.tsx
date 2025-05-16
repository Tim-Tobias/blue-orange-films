import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ProjectFormData } from '../form';

interface FilesFormProps {
    isEdit: boolean;
    form: UseFormReturn<ProjectFormData>;
}

export default function FilesForm({ form }: FilesFormProps) {
    const { errors: inertiaErrors } = usePage().props;

    const {
        control,
        setValue,
        register,
        watch,
        formState: { errors: hookErrors },
    } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'files',
    });

    const handleCategoryChange = (index: number, category: 'video' | 'image') => {
        const updated = [...watch('files')];
        updated[index].category = category;
        updated[index].project_link = '';
        setValue('files', updated);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h6 className="text-xl font-semibold">Project Files</h6>
                    <Button type="button" onClick={() => append({ title: '', category: 'image', project_link: '', description: '' })}>
                        Add File
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-5">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex flex-col gap-3 border-b pb-4">
                            {/* Title */}
                            <div>
                                <Input placeholder="Title" {...register(`files.${index}.title`)} />
                                {hookErrors.files?.[index]?.title && <p className="text-sm text-red-500">{hookErrors.files[index].title?.message}</p>}
                                {inertiaErrors[`files.${index}.title`] && (
                                    <p className="text-sm text-red-500">{inertiaErrors[`files.${index}.title`]}</p>
                                )}
                            </div>

                            {/* Category */}
                            <RadioGroup
                                defaultValue={field.category}
                                onValueChange={(val) => handleCategoryChange(index, val as 'video' | 'image')}
                                className="flex gap-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="image" id={`image-${field.id}`} />
                                    <label htmlFor={`image-${field.id}`}>Image</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="video" id={`video-${field.id}`} />
                                    <label htmlFor={`video-${field.id}`}>Video</label>
                                </div>
                            </RadioGroup>

                            {/* Project Link */}
                            {watch(`files.${index}.category`) === 'image' ? (
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setValue(`files.${index}.project_link`, e.target.files?.[0] ?? '')}
                                />
                            ) : (
                                <Input
                                    type="text"
                                    placeholder="YouTube Link"
                                    value={(watch(`files.${index}.project_link`) as string) ?? ''}
                                    onChange={(e) => setValue(`files.${index}.project_link`, e.target.value)}
                                />
                            )}
                            {hookErrors.files?.[index]?.project_link && (
                                <p className="text-sm text-red-500">{hookErrors.files[index].project_link?.message}</p>
                            )}
                            {inertiaErrors[`files.${index}.project_link`] && (
                                <p className="text-sm text-red-500">{inertiaErrors[`files.${index}.project_link`]}</p>
                            )}

                            {/* Description */}
                            <Textarea placeholder="Description" {...register(`files.${index}.description`)} />
                            {hookErrors.files?.[index]?.description && (
                                <p className="text-sm text-red-500">{hookErrors.files[index].description?.message}</p>
                            )}
                            {inertiaErrors[`files.${index}.description`] && (
                                <p className="text-sm text-red-500">{inertiaErrors[`files.${index}.description`]}</p>
                            )}

                            {/* Remove button */}
                            {fields.length > 1 && <X onClick={() => remove(index)} className="cursor-pointer self-end text-red-600" />}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
