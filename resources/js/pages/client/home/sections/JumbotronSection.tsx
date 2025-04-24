import AppFrontContainer from '@/components/app-front-container';
import { AppFrontWrapper } from '@/components/app-front-wrapper';
import Player from '@/components/jumbotron';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Parallax } from 'react-scroll-parallax';

const JumbotronSection = () => {
    return (
        <AppFrontContainer>
            <div className="pointer-events-none absolute top-0 left-0 h-screen w-full">
                <Parallax translateY={[-20, 20]} speed={2} className="h-screen w-full">
                    <Player url="https://www.dropbox.com/scl/fi/eg0c3th4vyjnnz09cwxam/22512-328261507_tiny.mp4?rlkey=sk0uvs93a3uby17qbzdx1c3cx&raw=1" />
                </Parallax>
            </div>

            <AppFrontWrapper>
                <div className="absolute bottom-8 flex gap-5">
                    <Link href="/works">
                        <Button
                            size="lg"
                            className="cursor-pointer border border-[#1E4E79] bg-transparent py-5 text-[#1E4E79] transition-all hover:bg-[#1E4E79] hover:text-white"
                        >
                            All Projects
                        </Button>
                    </Link>
                </div>
            </AppFrontWrapper>
        </AppFrontContainer>
    );
};

export default JumbotronSection;
