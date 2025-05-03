import { AppFrontWrapper } from '@/components/app-front-wrapper';
import CardWork from '@/components/card-work';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ServiceList = [
    {
        imageUrl: 'https://picsum.photos/id/250/200/300',
        title: 'Lorem Ipsum',
        categories: [{ name: 'Commercial' }, { name: 'Documentary' }],
    },
    {
        imageUrl: 'https://picsum.photos/id/251/200/300',
        title: 'Lorem Ipsum',
        categories: [{ name: 'Music Video' }],
    },
    {
        imageUrl: 'https://picsum.photos/id/252/200/300',
        title: 'Lorem Ipsum',
        categories: [{ name: 'Commercial' }],
    },
    {
        imageUrl: 'https://picsum.photos/id/253/200/300',
        title: 'Lorem Ipsum',
        categories: [{ name: 'Commercial' }, { name: 'Music Video' }],
    },
];

const item = {
    hidden: { opacity: 0, x: -50, y: -50 },
    show: { opacity: 1, x: 0, y: 0 },
};

const ProjectSection = () => {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false,
        delay: 300,
    });

    return (
        <AppFrontWrapper className="overflow-hidden">
            <div className="space-y-10 py-12 md:py-25">
                <h1 data-aos="fade-right" data-aos-delay="50" className="text-center md:text-3xl">
                    Latest Work
                </h1>

                <AnimatePresence mode="wait">
                    <div ref={ref} className="grid grid-cols-1 pb-10 md:grid-cols-4">
                        {ServiceList.map((service, index) => (
                            <motion.div
                                variants={item}
                                initial="hidden"
                                animate={inView ? 'show' : 'hidden'}
                                transition={{ delay: index * 0.1 }}
                                className="w-full cursor-pointer"
                            >
                                <Link href="/works/1">
                                    <CardWork imageUrl={service.imageUrl} tags={service.categories} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>
        </AppFrontWrapper>
    );
};

export default ProjectSection;
