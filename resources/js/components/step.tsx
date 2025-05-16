import { ComponentProps } from 'react';

interface StepProps extends ComponentProps<'div'> {
    number: number;
    title: string;
    description: string;
}

const Step = ({ number, title, description, className, ...props }: StepProps) => {
    return (
        <div className={className} {...props}>
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black text-lg font-semibold">{number}</div>
                <div className="flex-1">
                    <h3 className="mb-1 text-xl font-semibold">{title}</h3>
                    <p className="text-lg text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default Step;
