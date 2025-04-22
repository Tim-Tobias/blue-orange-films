import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { JSX, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { ParallaxProvider } from 'react-scroll-parallax';
import FooterLayout from './layouts/client/footer-layout';
import HeaderLayout from './layouts/client/header-layout';

createInertiaApp({
    title: (title) => title,
    resolve: async (name) => {
        const page = (await resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'))) as {
            default: React.FC & {
                layout?: (page: ReactNode) => JSX.Element;
            };
        };

        page.default.layout = name.startsWith('admin')
            ? undefined
            : (page: ReactNode) => (
                  <ParallaxProvider>
                      <HeaderLayout />
                      {page}
                      <FooterLayout />
                  </ParallaxProvider>
              );

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
