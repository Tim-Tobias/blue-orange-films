import { AppFrontWrapper } from '@/components/app-front-wrapper';
import Player from '@/components/player';
import IntroduceLayout from '@/layouts/client/IntroduceLayout';
import { About, Banner } from '@/types';
import parser from 'html-react-parser';

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
                <div data-aos="fade-in" data-aos-delay={300} className="h-[80vh] w-full">
                    {about?.image_url && (
                        <Player
                            muted={banner?.muted ? true : false}
                            playing={banner?.autoplay ? true : false}
                            controls={true}
                            loop
                            url={banner?.image_url ? banner.image_url : ''}
                        />
                    )}
                </div>
            )}

            <AppFrontWrapper>
                <div className="grid grid-cols-1 items-center justify-items-center gap-10 py-10 md:grid-cols-2">
                    <img
                        data-aos="fade-up"
                        data-aos-delay="100"
                        src={about?.image_url}
                        alt={about?.image_url}
                        className="mx-auto block w-42 md:hidden"
                    />
                    <img data-aos="fade-right" data-aos-delay="500" src={about?.image_url} alt={about?.content} className="hidden w-72 md:block" />

                    <div data-aos="fade-left" data-aos-delay="300" className="text-center md:text-left">
                        {parser(about?.content || '')}
                    </div>
                </div>
            </AppFrontWrapper>
        </>
    );
};

export default AboutSection;
