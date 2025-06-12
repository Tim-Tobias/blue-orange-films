import { useEffect, useState } from 'react';
import Player from '@/components/player';
import AppFrontContainer from '@/components/app-front-container';
import { Banner } from '@/types';

const JumbotronSection = ({ banner }: { banner?: Banner }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (banner?.category === 'video' && banner.autoplay) {
            setIsPlaying(true);
        }
    }, [banner]);

    const handleTogglePlay = () => {
        setIsPlaying(prev => !prev);
    };

    return (
        <AppFrontContainer>
            {banner?.category === 'video' ? (
                <div onClick={handleTogglePlay} className="cursor-pointer">
                    <Player
                        url={banner.image_url ?? ''}
                        playing={isPlaying}
                        muted={banner?.muted ?? false}
                        loop
                        controls={false}
                    />
                </div>
            ) : (
                <img src={banner?.image_url} alt={banner?.title} className="h-full w-full object-cover" />
            )}
        </AppFrontContainer>
    );
};

export default JumbotronSection;
