import { AppFrontWrapper } from '@/components/app-front-wrapper';
import Player from '@/components/player';
import { AnimatePresence, motion } from 'framer-motion';

import { capitalizeWords } from '@/helpers/capital_letter';
import { Project } from '@/types';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';

interface InfoSectionProps {
    project: Project;
}

const InfoSection = ({ project }: InfoSectionProps) => {
    const [showSwiper, setShowSwiper] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const handleImageClick = (index: number) => {
        setStartIndex(index);
        setShowSwiper(true);
    };

    const groupedByRole = project.teams?.reduce<Record<string, string[]>>((acc, crew) => {
        const roleName = crew.role?.name || 'Unknown';
        if (!acc[roleName]) {
            acc[roleName] = [];
        }
        acc[roleName].push(crew.name_crew?.name || '');
        return acc;
    }, {});

    useEffect(() => {
        if (showSwiper) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showSwiper]);

    return (
        <>
            <AppFrontWrapper className="space-y-24">
                <div className="px-6 py-10">
                    <div className="text-2xl font-bold text-orange-400">{project.title}</div>
                    <p className="text-sm">
                        {project.category?.name} | {project.duration} | {project.aspect_ratio}
                    </p>
                    <p className="mt-2 text-sm">{project.description}</p>

                    <div className="mt-8 grid grid-cols-2 gap-6 text-sm md:grid-cols-3 lg:grid-cols-6">
                        <div>
                            <p className="font-semibold text-orange-400">Year</p>
                            <p className="">{project.year}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-orange-400">Client</p>
                            <p className="">{project.client}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-orange-400">Agency</p>
                            <p className="">Blue Orange Films</p>
                        </div>

                        {groupedByRole &&
                            Object.entries(groupedByRole).map(([role, names], idx) => (
                                <div key={idx}>
                                    <p className="font-semibold text-orange-400">{capitalizeWords(role)}</p>
                                    {names.map((name) => (
                                        <p>{capitalizeWords(name)}</p>
                                    ))}
                                </div>
                            ))}
                    </div>
                </div>

                <h5 className="text-center text-2xl font-semibold">Behind The Scene</h5>

                {project.files?.map(
                    (file, index) =>
                        file.category === 'video' && (
                            <div key={index} className="h-[550px]">
                                <Player controls={true} url={file.project_link} />
                            </div>
                        ),
                )}

                <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {project.files?.map(
                            (item, val) =>
                                item.category === 'image' && (
                                    <div
                                        className="group h-[250px] w-full cursor-pointer overflow-hidden"
                                        onClick={() => handleImageClick(val)}
                                        key={val}
                                    >
                                        <img
                                            className="h-full w-full object-cover transition-all group-hover:scale-110"
                                            src={item.project_url}
                                            alt=""
                                            key={val}
                                        />
                                    </div>
                                ),
                        )}
                    </div>
                </div>
            </AppFrontWrapper>

            <AnimatePresence>
                {showSwiper && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center"
                    >
                        <div className="w-[100%] overflow-hidden rounded-lg">
                            <div onClick={() => setShowSwiper(false)} className="absolute top-0 left-0 h-full w-full bg-black opacity-80"></div>

                            <motion.div
                                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                className="mx-auto w-[90%]"
                            >
                                <Swiper initialSlide={startIndex} navigation pagination={{ clickable: true }}>
                                    {project.files?.map(
                                        (img, idx) =>
                                            img.category === 'image' && (
                                                <SwiperSlide key={idx}>
                                                    <img src={img.project_url} alt={img.title} className="h-full w-full object-contain" />
                                                </SwiperSlide>
                                            ),
                                    )}
                                </Swiper>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default InfoSection;
