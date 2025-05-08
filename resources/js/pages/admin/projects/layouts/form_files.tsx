import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ProjectFormData } from '../form';

interface FilesFormProps {
    form: UseFormReturn<ProjectFormData>;
}

export default function FilesForm({ form }: FilesFormProps) {
    const { control, watch, setValue } = form;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'files',
    });

    const handleCategoryChange = (index: number, category: 'video' | 'image') => {
        const updated = [...watch('files')];
        updated[index].category = category;
        updated[index].project_link = null;
        setValue('files', updated);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h6 className="text-xl font-semibold">Project Files</h6>
                    <Button type="button" onClick={() => append({ title: '', category: 'image', project_link: null, description: '' })}>
                        Add File
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-5">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex flex-col gap-3 border-b pb-4">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <Input placeholder="Title" {...form.register(`files.${index}.title`)} />

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
                            </div>

                            {watch(`files.${index}.category`) === 'image' ? (
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => form.setValue(`files.${index}.project_link`, e.target.files?.[0] || null)}
                                />
                            ) : (
                                <Input type="text" placeholder="YouTube Link" {...form.register(`files.${index}.project_link`)} />
                            )}

                            <Textarea placeholder="Description" {...form.register(`files.${index}.description`)} />

                            {fields.length > 1 && <X onClick={() => remove(index)} className="cursor-pointer self-end text-red-600" />}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
