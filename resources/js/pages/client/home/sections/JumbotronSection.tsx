import AppFrontContainer from '@/components/app-front-container';
import Player from '@/components/player';
import { Banner } from '@/types';
import { Parallax } from 'react-scroll-parallax';

const JumbotronSection = ({ banner }: { banner: Banner }) => {
    return (
        <AppFrontContainer>
            <div className="pointer-events-none absolute top-0 left-0 h-screen w-full">
                <Parallax translateY={[-20, 20]} speed={2} className="h-screen w-full">
                    {banner.category === 'video' ? (
                        <Player muted playing controls={false} loop url={banner.image_url!} />
                    ) : (
                        <img src={banner.image_url} alt={banner.title} className="h-full w-full object-cover" />
                    )}
                </Parallax>
            </div>
            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50" />
        </AppFrontContainer>
    );
};

export default JumbotronSection;
