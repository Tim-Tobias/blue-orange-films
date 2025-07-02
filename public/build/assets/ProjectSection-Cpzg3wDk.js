import { j as a, A as d, $ as l, k as o } from './app-CQZ61BoK.js';
import { A as n } from './app-front-wrapper-sNM0ows3.js';
import { C as m } from './card-work-B4QvBGL6.js';
import { u as h } from './index-CJfUueOe.js'; /* empty css            */
const c = { hidden: { opacity: 0, x: -50, y: -50 }, show: { opacity: 1, x: 0, y: 0 } },
    w = ({ projects: e }) => {
        const { ref: s, inView: r } = h({ threshold: 0, triggerOnce: !1, delay: 300 });
        return a.jsx(n, {
            className: 'max-w-[1570px] overflow-hidden',
            children: a.jsxs('div', {
                className: 'space-y-10 py-12 md:py-25',
                children: [
                    a.jsx('h1', { 'data-aos': 'fade-right', 'data-aos-delay': '50', className: 'text-center md:text-3xl', children: 'Latest Work' }),
                    a.jsx(d, {
                        mode: 'wait',
                        children: a.jsx('div', {
                            ref: s,
                            className: 'grid grid-cols-1 pb-10 lg:grid-cols-3',
                            children:
                                e == null
                                    ? void 0
                                    : e.map((i, t) =>
                                          a.jsx(o.div, {
                                              variants: c,
                                              initial: 'hidden',
                                              animate: r ? 'show' : 'hidden',
                                              transition: { delay: t * 0.1 },
                                              className: 'h-[234px] w-full cursor-pointer',
                                              children: a.jsx(l, {
                                                  href: `/works/${i.id}`,
                                                  children: a.jsx(m, { imageUrl: i.highlight_image_url, title: i.title }),
                                              }),
                                          }),
                                      ),
                        }),
                    }),
                ],
            }),
        });
    };
export { w as default };
