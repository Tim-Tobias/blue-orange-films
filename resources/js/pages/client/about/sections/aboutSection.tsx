import { AppFrontWrapper } from '@/components/app-front-wrapper';
import Player from '@/components/player';
import IntroduceLayout from '@/layouts/client/IntroduceLayout';
import { About, Banner } from '@/types';

interface AboutSectionProps {
    about?: About;
    banner?: Banner;
}

const AboutSection = ({ about, banner }: AboutSectionProps) => {
    return (
        <>
            {banner?.category === 'image' ? (
                <IntroduceLayout imgUrl={banner?.image_url ? banner.image_url : ''} title="About" />
            ) : (
                <div className="h-full w-full">
                    <Player muted playing controls={false} loop url={banner?.image_url ? banner.image_url : ''} />
                </div>
            )}

            <AppFrontWrapper>
                <div className="grid grid-cols-1 items-center justify-items-center gap-10 pb-10 md:grid-cols-2">
                    <img
                        data-aos="fade-up"
                        data-aos-delay="100"
                        src={about?.image_url}
                        alt={about?.content}
                        className="mx-auto block w-64 md:hidden"
                    />
                    <img data-aos="fade-left" data-aos-delay="50" src={about?.image_url} alt={about?.content} className="hidden w-72 md:block" />

                    <p data-aos="fade-right" className="text-center md:text-left">
                        {about?.content}
                    </p>
                </div>
            </AppFrontWrapper>
        </>
    );
};

export default AboutSection;
