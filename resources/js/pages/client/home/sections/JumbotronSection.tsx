import AppFrontContainer from '@/components/app-front-container';
import { Banner } from '@/types';
import { BiChevronsDown } from 'react-icons/bi';
import { Parallax } from 'react-scroll-parallax';

const JumbotronSection = ({ banner }: { banner?: Banner }) => {
    const handleScroll = () => {
        const section = document.getElementById('home-about');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AppFrontContainer>
            <div className="pointer-events-none absolute top-0 left-0 h-screen w-full">
                <Parallax translateY={[-20, 20]} speed={2} className="h-screen w-full">
                    {banner?.category === 'video' ? (
                        <div data-aos="fade-in" data-aos-delay={500} className="h-full w-full">
                            <video src={banner?.image_url || ''} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                        </div>
                    ) : (
                        <img
                            fetchPriority="high"
                            data-aos="fade-in"
                            data-aos-delay={300}
                            src={banner?.image_url}
                            alt={banner?.title}
                            className="h-full w-full object-cover"
                        />
                    )}
                </Parallax>
            </div>
            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50" />
            <div onClick={handleScroll} className="absolute right-5 bottom-5 animate-bounce cursor-pointer text-4xl text-white lg:text-6xl">
                <BiChevronsDown />
            </div>
        </AppFrontContainer>
    );
};

export default JumbotronSection;
