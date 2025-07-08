import AppFrontContainer from '@/components/app-front-container';
import { Banner } from '@/types';
import { FaAngleDoubleDown } from 'react-icons/fa';

const JumbotronSection = ({ banner }: { banner?: Banner }) => {
    const handleScroll = () => {
        const section = document.getElementById('work-home');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AppFrontContainer className={`h-[80vh] w-full md:h-[${banner?.category === 'video' ? '80vh' : '100vh'}]`}>
            <div onClick={handleScroll} className="absolute right-5 bottom-5 z-20 animate-bounce cursor-pointer text-4xl text-white lg:text-6xl">
                <FaAngleDoubleDown />
            </div>

            {banner?.category === 'video' ? (
                <div data-aos="fade-in" data-aos-delay={300} className="h-[80vh] w-full cursor-pointer">
                    <video
                        src={banner.image_url}
                        autoPlay={banner.autoplay ?? false}
                        muted={banner.muted ?? false}
                        controls
                        loop
                        playsInline={banner.autoplay ?? false}
                        className="h-full w-full object-cover"
                    />
                </div>
            ) : (
                <img src={banner?.image_url} alt={banner?.title} className="h-full w-full object-cover" />
            )}
        </AppFrontContainer>
    );
};

export default JumbotronSection;
