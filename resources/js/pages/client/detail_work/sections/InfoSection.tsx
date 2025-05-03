import { AppFrontWrapper } from '@/components/app-front-wrapper';
import Player from '@/components/player';
import { AnimatePresence, motion } from 'framer-motion';
import { projectCredits } from '../data';

import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';

const workDetaiList = [
    {
        imageUrl: 'https://picsum.photos/id/250/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/251/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/252/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/253/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/254/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/255/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/256/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/257/200/300',
    },
];

const InfoSection = () => {
    const [showSwiper, setShowSwiper] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const handleImageClick = (index: number) => {
        setStartIndex(index);
        setShowSwiper(true);
    };

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
                    <div className="text-2xl font-bold text-orange-400">{projectCredits.title}</div>
                    <p className="text-sm">{projectCredits.subtitle}</p>
                    <p className="mt-2 text-sm">{projectCredits.description}</p>

                    <div className="mt-8 grid grid-cols-2 gap-6 text-sm md:grid-cols-3 lg:grid-cols-6">
                        {projectCredits.credits.map((credit, idx) => (
                            <div key={idx}>
                                <p className="font-semibold text-orange-400">{credit.role}</p>
                                {credit.names.map((name, i) => (
                                    <p key={i} className="">
                                        {name}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-[550px]">
                    <Player
                        controls={true}
                        url="https://www.dropbox.com/scl/fi/eg0c3th4vyjnnz09cwxam/22512-328261507_tiny.mp4?rlkey=sk0uvs93a3uby17qbzdx1c3cx&raw=1"
                    />
                </div>

                <div className="space-y-5">
                    <h5 className="text-center text-2xl font-semibold">Pictures</h5>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {workDetaiList.map((item, val) => (
                            <div className="group h-[250px] w-full cursor-pointer overflow-hidden" onClick={() => handleImageClick(val)} key={val}>
                                <img
                                    className="h-full w-full object-cover transition-all group-hover:scale-110"
                                    src={item.imageUrl}
                                    alt=""
                                    key={val}
                                />
                            </div>
                        ))}
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
                                className="mx-auto h-[600px] w-[80%]"
                            >
                                <Swiper initialSlide={startIndex} navigation pagination={{ clickable: true }}>
                                    {workDetaiList.map((img, idx) => (
                                        <SwiperSlide key={idx}>
                                            <img src={img.imageUrl} alt={img.imageUrl} className="h-full w-full object-cover" />
                                        </SwiperSlide>
                                    ))}
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
