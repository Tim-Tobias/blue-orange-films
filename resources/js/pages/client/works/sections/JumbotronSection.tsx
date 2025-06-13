import AppFrontContainer from '@/components/app-front-container';
import Player from '@/components/player';
import { Banner } from '@/types';

const JumbotronSection = ({ banner }: { banner?: Banner }) => {
    return (
        <AppFrontContainer>
            {banner?.category === 'video' ? (
                <div className="cursor-pointer">
                    <Player url={banner.image_url ?? ''} playing={banner.autoplay ?? false} muted={banner?.muted ?? false} loop controls={true} />
                </div>
            ) : (
                <img src={banner?.image_url} alt={banner?.title} className="h-full w-full object-cover" />
            )}
        </AppFrontContainer>
    );
};

export default JumbotronSection;
