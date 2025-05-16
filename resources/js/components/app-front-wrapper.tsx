import { cn } from '@/lib/utils';
import * as React from 'react';

export function AppFrontWrapper({ children, className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn('mx-auto max-w-[1280px] overflow-hidden p-4', className)} {...props}>
            {children}
        </div>
    );
}
