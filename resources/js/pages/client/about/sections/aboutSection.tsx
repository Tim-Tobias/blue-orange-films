import { AppFrontWrapper } from '@/components/app-front-wrapper';
import useScrollPosition from '@/hooks/use-scroll-position';
import IntroduceLayout from '@/layouts/client/IntroduceLayout';
import { About, Banner } from '@/types';
import { motion } from 'framer-motion';
import parser from 'html-react-parser';
import { BiChevronsDown } from 'react-icons/bi';

interface AboutSectionProps {
    about?: About;
    banner?: Banner;
}

const AboutSection = ({ about, banner }: AboutSectionProps) => {
    const handleScroll = () => {
        const section = document.getElementById('about-home');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }
    };

    const scrollY = useScrollPosition();

    return (
        <>
            <div className="relative">
                {banner?.category === 'image' ? (
                    <IntroduceLayout imgUrl={banner?.image_url ? banner.image_url : ''} title="About" />
                ) : (
                    <div data-aos="fade-in" data-aos-delay={300} className="h-[80vh] w-full">
                        {about?.image_url && (
                            <video
                                src={banner?.image_url || ''}
                                autoPlay={banner?.autoplay ?? false}
                                muted={banner?.muted ?? false}
                                controls
                                loop
                                playsInline={banner?.autoplay ?? false}
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>
                )}
            </div>

            <AppFrontWrapper>
                <motion.div
                    initial={{ opacity: 1, y: 50 }}
                    animate={scrollY > 0 ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    onClick={handleScroll}
                    className="absolute right-5 bottom-0 z-20 animate-bounce cursor-pointer text-4xl text-white lg:text-6xl"
                >
                    <BiChevronsDown className="text-[#666b67]" />
                </motion.div>
            </AppFrontWrapper>

            <div id="about-home" className="py-20">
                <AppFrontWrapper className="max-w-[1140px]">
                    <div className="grid grid-cols-1 items-center justify-items-center gap-10 py-10 md:grid-cols-2">
                        <img
                            data-aos="fade-up"
                            data-aos-delay="300"
                            src={about?.image_url}
                            alt={about?.image_url}
                            className="mx-auto block w-72 md:hidden"
                        />
                        <img
                            data-aos="fade-right"
                            data-aos-delay="300"
                            src={about?.image_url}
                            alt={about?.content}
                            className="hidden w-[180px] md:block"
                        />

                        <div data-aos="fade-left" data-aos-delay="500" className="text-center md:text-left">
                            {parser(about?.content || '')}
                        </div>
                    </div>
                </AppFrontWrapper>
            </div>
        </>
    );
};

export default AboutSection;
