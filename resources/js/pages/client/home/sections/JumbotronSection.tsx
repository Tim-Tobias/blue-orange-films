import AppFrontContainer from '@/components/app-front-container';
import Player from '@/components/player';
import { Parallax } from 'react-scroll-parallax';

const JumbotronSection = () => {
    return (
        <AppFrontContainer>
            <div className="pointer-events-none absolute top-0 left-0 h-screen w-full">
                <Parallax translateY={[-20, 20]} speed={2} className="h-screen w-full">
                    <Player
                        muted
                        playing
                        controls={false}
                        loop
                        url="https://www.dropbox.com/scl/fi/eg0c3th4vyjnnz09cwxam/22512-328261507_tiny.mp4?rlkey=sk0uvs93a3uby17qbzdx1c3cx&raw=1"
                    />
                </Parallax>
            </div>
            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50" />
        </AppFrontContainer>
    );
};

export default JumbotronSection;
