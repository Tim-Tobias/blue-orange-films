import { forwardRef } from 'react';
import ReactPlayer from 'react-player';
import { BaseReactPlayerProps } from 'react-player/base';

interface PlayerProps extends Omit<BaseReactPlayerProps, 'width' | 'height'> {
    url: string;
}

const Player = forwardRef<ReactPlayer, PlayerProps>((props, ref) => {
    return (
        <ReactPlayer
            ref={ref}
            width="100%"
            height="100%"
            style={{
                height: '100vh',
            }}
            playsinline
            {...props}
        />
    );
});

export default Player;
