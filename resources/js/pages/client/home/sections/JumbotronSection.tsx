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
                    <Player url="https://www.youtube.com/watch?v=DppVAQqaNE4&pp=ygULdmlkZW8gMjE6MTA%3D" />
                </Parallax>
            </div>

            <AppFrontWrapper>
                <div className="absolute bottom-8 z-20 flex gap-5">
                    <Link href="#">
                        <Button className="cursor-pointer bg-[#1E4E79] transition-all hover:bg-[#ED7D31]">All Projects</Button>
                    </Link>
                    <Link href="#">
                        <Button className="cursor-pointer bg-[#1E4E79] transition-all hover:bg-[#ED7D31]">Detail Project</Button>
                    </Link>
                </div>
            </AppFrontWrapper>
        </AppFrontContainer>
    );
};

export default JumbotronSection;
