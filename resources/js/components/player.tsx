import ReactPlayer from 'react-player';
import { BaseReactPlayerProps } from 'react-player/base';

interface PlayerProps extends Omit<BaseReactPlayerProps, 'width' | 'height'> {
    url: string;
}

const Player = ({ ...props }: PlayerProps) => {
    return (
        <ReactPlayer
            width="100%"
            height="100%"
            style={{
                height: '100vh',
            }}
            {...props}
        />
    );
};

export default Player;
