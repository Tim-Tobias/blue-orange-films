import { j as e } from './app-CQZ61BoK.js';
import { A as r } from './app-front-wrapper-sNM0ows3.js'; /* empty css            */
const c = ({ client: s }) =>
    e.jsx(r, {
        className: 'max-w-[1570px]',
        children: e.jsxs('div', {
            className: 'space-y-10 py-12',
            children: [
                e.jsx('h3', { className: 'text-center text-2xl font-bold uppercase', children: 'Our Client' }),
                e.jsx('div', {
                    className: 'grid w-full grid-cols-1 place-items-center',
                    children: s && e.jsx('img', { className: 'object-cover transition-all hover:opacity-60', src: s.image_url, alt: 'logo' }),
                }),
            ],
        }),
    });
export { c as default };
