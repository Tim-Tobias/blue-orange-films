import { AppFrontWrapper } from '@/components/app-front-wrapper';
import SocialMediaFooter from '@/components/social-media-footer';
import IntroduceLayout from '@/layouts/client/IntroduceLayout';
import { Head } from '@inertiajs/react';

const ContactPage = () => {
    return (
        <>
            <Head title="Contact" />

            <IntroduceLayout imgUrl="https://picsum.photos/id/352/200/300" title="Contact" />
            <AppFrontWrapper className="mb-20">
                <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
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

                    <div className="flex flex-col">
                        <h2 className="mb-4 text-2xl font-bold text-orange-500">How to Get There</h2>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.1422986339478!2d106.8299487!3d-6.3050758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f24c6e2fce9f%3A0xf3ff3d79c0a0d228!2sDAvenue%20Office%20Space!5e0!3m2!1sen!2sid!4v1651773798856!5m2!1sen!2sid"
                            width="100%"
                            height="250"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </AppFrontWrapper>
        </>
    );
};

export default ContactPage;
