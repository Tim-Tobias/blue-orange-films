import * as React from 'react';

export function AppWrapper({ children, ...props }: React.ComponentProps<'section'>) {
    return (
        <section className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4" {...props}>
            {children}
        </section>
    );
}
