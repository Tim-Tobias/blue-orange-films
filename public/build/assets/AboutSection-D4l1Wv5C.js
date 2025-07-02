import { j as e, $ as s } from './app-CQZ61BoK.js';
import { A as r } from './app-front-wrapper-sNM0ows3.js';
import { p as l } from './index-CNj5Lc_Y.js'; /* empty css            */
const o = (t, a = 250) => t.slice(0, a) + (t.length > a ? '...' : ''),
    m = (t) => {
        var a;
        return e.jsx(r, {
            className: 'max-w-[1570px] overflow-hidden',
            children: e.jsx('div', {
                className: 'grid w-full grid-cols-1 gap-5 py-12 md:grid-cols-2 md:py-32',
                children: e.jsxs('div', {
                    className: 'space-y-3',
                    children: [
                        e.jsx('h6', { 'data-aos': 'fade-left', className: 'text-center text-2xl font-bold md:text-left', children: 'About BOF' }),
                        ((a = t.about) == null ? void 0 : a.content) &&
                            e.jsxs('div', {
                                'data-aos': 'fade-left',
                                'data-aos-delay': '100',
                                className: 'text-center md:text-left',
                                children: [
                                    l(o(t.about.content, 300)),
                                    e.jsx(s, { href: '/about', className: 'text-blue-500 hover:underline', children: 'Read more' }),
                                ],
                            }),
                    ],
                }),
            }),
        });
    };
export { m as default };
