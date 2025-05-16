import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

const AppFrontContainer = ({ children, className, ...props }: ComponentProps<'div'>) => {
    return (
        <div className={cn('relative h-screen w-full overflow-hidden', className)} {...props}>
            {children}
        </div>
    );
};

export default AppFrontContainer;
