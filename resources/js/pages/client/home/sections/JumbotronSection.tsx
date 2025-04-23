import AppFrontContainer from '@/components/app-front-container';
import { AppFrontWrapper } from '@/components/app-front-wrapper';
import Player from '@/components/jumbotron';
import { Button } from '@/components/ui/button';
import { Parallax } from 'react-scroll-parallax';

const JumbotronSection = () => {
    return (
        <AppFrontContainer>
            <div className="pointer-events-none absolute top-0 left-0 h-screen w-full">
                <Parallax translateY={[-20, 20]} speed={2} className="h-screen w-full">
                    <Player url="https://www.youtube.com/watch?v=8oON21G1Bqg&ab_channel=BeeSocial" />
                </Parallax>

                <AppFrontWrapper>
                    <div className="absolute bottom-8 flex gap-5">
                        <Button>All Projects</Button>
                        <Button>Detail Project</Button>
                    </div>
                </AppFrontWrapper>
            </div>
        </AppFrontContainer>
    );
};

export default JumbotronSection;
