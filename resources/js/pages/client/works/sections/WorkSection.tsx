import { AppFrontWrapper } from '@/components/app-front-wrapper';
import CardWork from '@/components/card-work';
import CategoryFilter from '@/components/category-filter';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
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
    {
        imageUrl: 'https://picsum.photos/id/254/200/300',
        title: 'Lorem Ipsum',
        categories: [{ name: 'Commercial' }],
    },
    {
        imageUrl: 'https://picsum.photos/id/255/200/300',
        title: 'Lorem Ipsum',
        categories: [{ name: 'Commercial' }],
    },
    {
        imageUrl: 'https://picsum.photos/id/256/200/300',
        title: 'Lorem Ipsum',
        categories: [{ name: 'Music Video' }],
    },
    {
        imageUrl: 'https://picsum.photos/id/257/200/300',
        title: 'Lorem Ipsum',
        categories: [{ name: 'Music Video' }],
    },
];

const categories = ['Commercial', 'Documentary', 'Music Video'];

const item = {
    hidden: { opacity: 0, x: -50, y: -50 },
    show: { opacity: 1, x: 0, y: 0 },
};

const WorkSection = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false,
        delay: 300,
    });

    const filteredList = useMemo(() => {
        if (selectedCategory === 'All') return ServiceList;
        return ServiceList.filter((item) => item.categories.some((c) => c.name === selectedCategory));
    }, [selectedCategory]);

    return (
        <>
            <AppFrontWrapper>
                <div className="py-10">
                    <CategoryFilter categories={categories} onSelect={setSelectedCategory} selected={selectedCategory} />
                </div>
            </AppFrontWrapper>

            <AnimatePresence mode="wait">
                <div ref={ref} key={selectedCategory} className="grid grid-cols-1 pb-10 md:grid-cols-4">
                    {filteredList.map((service, index) => (
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
        </>
    );
};

export default WorkSection;
