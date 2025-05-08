import { AppFrontWrapper } from '@/components/app-front-wrapper';
import SocialMediaFooter from '@/components/social-media-footer';
import IntroduceLayout from '@/layouts/client/IntroduceLayout';
import { Head } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const contactList = [
    {
        imageUrl: 'https://picsum.photos/id/250/300/500',
    },
    {
        imageUrl: 'https://picsum.photos/id/251/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/252/200/300',
    },
];

const ContactPage = () => {
    return (
        <>
            <Head title="Contact" />

            <IntroduceLayout imgUrl="https://picsum.photos/id/352/200/300" title="Contact" />
            <AppFrontWrapper className="mb-20">
                <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-3">
                    <div className="col-span-2 flex flex-col">
                        <Swiper className="h-[300px] w-full" autoplay={true} modules={[Pagination]} loop pagination={true}>
                            {contactList.map((src, i) => (
                                <SwiperSlide key={i}>
                                    <img src={src.imageUrl} alt={`Slide ${i}`} className="h-full w-full object-cover" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="mb-2 text-2xl font-bold text-orange-500">Talk to Us!</h2>
                            <p>So we can create creative projects together.</p>
                            <p className="mt-2">Phone: +62 851 6309 9469</p>
                            <p>Email: kabardariselatanfilms@gmail.com</p>
                        </div>

                        <div>
                            <h2 className="mb-2 text-2xl font-bold text-orange-500">Address</h2>
                            <p>
                                PT. KABAR KREASI ASIA
                                <br />
                                Jl. Teratai Raya Blok F No.4 RT.03/RW02
                                <br />
                                Kel. Tanjung Barat, Kec. Jagakarsa, Jakarta Selatan, DKI Jakarta 12530
                            </p>

                            <div className="mt-4 flex gap-3">
                                <SocialMediaFooter color="black" />
                            </div>
                        </div>
                    </div>
                </div>
            </AppFrontWrapper>
        </>
    );
};

export default ContactPage;
