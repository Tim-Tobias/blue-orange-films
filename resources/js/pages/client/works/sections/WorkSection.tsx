import { AppFrontWrapper } from '@/components/app-front-wrapper';
import CardWork from '@/components/card-work';
import CategoryFilter from '@/components/category-filter';
import useScrollPosition from '@/hooks/use-scroll-position';
import LogoBlueOrange from '@/images/Blueorange-Square.png';
import { Project, ProjectCategory } from '@/types';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { BiChevronsDown } from 'react-icons/bi';
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
    const scrollY = useScrollPosition();

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: false,
        delay: 300,
    });

    const handleScroll = () => {
        const section = document.getElementById('work-home');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <AppFrontWrapper id="work-home">
                <motion.div
                    initial={{ opacity: 1, y: 50 }}
                    animate={scrollY > 0 ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative flex items-center justify-center pt-10 text-center md:gap-10"
                >
                    <img src={LogoBlueOrange} alt="Blue Orange Films" className="h-10" />
                    <h1 className="text-lg font-bold md:text-2xl">Blue Orange Showreel Compilation {new Date().getFullYear()}</h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 1, y: 50 }}
                    animate={scrollY > 0 ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    onClick={handleScroll}
                    className="absolute right-5 bottom-0 z-20 animate-bounce cursor-pointer text-4xl text-white lg:text-6xl"
                >
                    <BiChevronsDown className="text-[#666b67]" />
                </motion.div>

                <div className="py-10">
                    <CategoryFilter categories={categories} onSelect={setSelectedCategory} selected={selectedCategory} />
                </div>

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
                                    className="min-h-[250px] w-full cursor-pointer 2xl:min-h-[300px]"
                                >
                                    <Link href={`/works/${service.id}`}>
                                        <CardWork
                                            imageUrl={service.highlight_image_url!}
                                            title={service.title}
                                            client={
                                                service.teams && service.teams?.length > 0 && service.teams[0].name_crew
                                                    ? service.teams[0].name_crew.name
                                                    : ''
                                            }
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </AppFrontWrapper>
        </>
    );
};

export default WorkSection;
