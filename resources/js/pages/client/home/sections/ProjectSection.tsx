import { AppFrontWrapper } from '@/components/app-front-wrapper';
import CardWork from '@/components/card-work';
import { Project } from '@/types';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const item = {
    hidden: { opacity: 0, x: -50, y: -50 },
    show: { opacity: 1, x: 0, y: 0 },
};

interface ProjectSectionProps {
    projects?: Project[];
}

const ProjectSection = ({ projects }: ProjectSectionProps) => {
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
                    <div ref={ref} className="grid grid-cols-1 pb-10 lg:grid-cols-3">
                        {projects?.map((service, index) => (
                            <motion.div
                                variants={item}
                                initial="hidden"
                                animate={inView ? 'show' : 'hidden'}
                                transition={{ delay: index * 0.1 }}
                                className="h-[234px] w-full cursor-pointer"
                            >
                                <Link href={`/works/${service.id}`}>
                                    <CardWork imageUrl={service.highlight_image_url!} title={service.title} />
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
