import AppFrontContainer from '@/components/app-front-container';
import { Banner } from '@/types';

const JumbotronSection = ({ banner }: { banner?: Banner }) => {
    return (
        <AppFrontContainer className={`h-[80vh] w-full md:h-[${banner?.category === 'video' ? '80vh' : '100vh'}]`}>
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
