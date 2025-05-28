import { AppFrontWrapper } from '@/components/app-front-wrapper';
import SocialMediaFooter from '@/components/social-media-footer';
import { Contact, ContactCarousell } from '@/types';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface ContactPageProps {
    contact?: Contact;
    carousell?: ContactCarousell[];
}

const ContactPage = ({ contact, carousell }: ContactPageProps) => {
    const [showSwiper, setShowSwiper] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const handleImageClick = (index: number) => {
        setStartIndex(index);
        setShowSwiper(true);
    };

    return (
        <>
            <Head title="Contact" />

            <AppFrontWrapper className="grid h-screen max-w-[1400px] grid-cols-1 place-items-center">
                <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-3">
                    <div className="col-span-2 flex flex-col">
                        <Swiper
                            className="h-[400px] w-full"
                            autoplay={{
                                delay: 1000,
                                disableOnInteraction: false,
                            }}
                            modules={[Pagination, Autoplay]}
                            loop
                            pagination={true}
                        >
                            {carousell?.map((src, i) => (
                                <SwiperSlide onClick={() => handleImageClick(i)} key={i}>
                                    <img src={src.image_url} alt={src.title} className="h-full w-full object-cover" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="flex flex-col gap-8 self-end">
                        <div>
                            <h2 className="mb-2 text-2xl font-bold text-orange-500">Talk to Us!</h2>
                            <p>So we can create creative projects together.</p>
                            <p className="mt-2">Phone: {contact?.phone}</p>
                            <p>Email: {contact?.email}</p>
                        </div>

                        <div>
                            <h2 className="mb-2 text-2xl font-bold text-orange-500">Address</h2>
                            <p>{contact?.address}</p>

                            <div className="mt-4 flex gap-3">
                                <SocialMediaFooter color="black" />
                            </div>
                        </div>
                    </div>
                </div>
            </AppFrontWrapper>

            <AnimatePresence>
                {showSwiper && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex h-screen">
                        <div className="w-[100%] overflow-hidden rounded-lg">
                            <div onClick={() => setShowSwiper(false)} className="absolute top-0 left-0 h-full w-full bg-black opacity-80"></div>

                            <motion.div
                                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                className="mx-auto h-full w-[90%]"
                            >
                                <Swiper initialSlide={startIndex} className="h-full w-full" navigation pagination={{ clickable: true }}>
                                    {carousell?.map((img, idx) => (
                                        <SwiperSlide key={idx}>
                                            <img src={img.image_url} alt={img.title} className="h-full w-full object-cover" />
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

export default ContactPage;
