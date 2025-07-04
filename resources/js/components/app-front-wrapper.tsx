import { cn } from '@/lib/utils';
import * as React from 'react';

export function AppFrontWrapper({ children, className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn('mx-auto max-w-[1570px] overflow-hidden p-8', className)} {...props}>
            {children}
        </div>
    );
}
