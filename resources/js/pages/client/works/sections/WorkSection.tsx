import { AppFrontWrapper } from '@/components/app-front-wrapper';
import CardWork from '@/components/card-work';
import CategoryFilter from '@/components/category-filter';
import { Project, ProjectCategory } from '@/types';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const item = {
    hidden: { opacity: 0, x: -50, y: -50 },
    show: { opacity: 1, x: 0, y: 0 },
};

interface WorkSectionProps {
    categories?: ProjectCategory[];
    projects?: Project[];
}

const WorkSection = ({ categories, projects }: WorkSectionProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false,
        delay: 300,
    });

    return (
        <>
            <AppFrontWrapper>
                <div className="py-10">
                    <CategoryFilter categories={categories} onSelect={setSelectedCategory} selected={selectedCategory} />
                </div>
            </AppFrontWrapper>

            <AnimatePresence>
                {projects && (
                    <div ref={ref} className="grid grid-cols-1 pb-10 md:grid-cols-3">
                        {projects.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                initial="hidden"
                                animate={inView ? 'show' : 'hidden'}
                                transition={{ delay: index * 0.1 }}
                                className="min-h-[250px] 2xl:min-h-[400px] w-full cursor-pointer"
                            >
                                <Link href={`/works/${service.id}`}>
                                    <CardWork imageUrl={service.highlight_image_url!} title={service.title} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WorkSection;
