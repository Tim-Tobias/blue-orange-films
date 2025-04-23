import ReactPlayer from 'react-player';

interface PlayerProps {
    url: string;
}

const Player = ({ url }: PlayerProps) => {
    return (
        <ReactPlayer
            width="100%"
            height="100%"
            controls={false}
            style={{
                height: '100vh',
            }}
            url={url}
            muted
            loop
            playing
        />
    );
};

export default Player;
