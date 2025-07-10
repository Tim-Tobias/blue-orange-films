import AppFrontContainer from '@/components/app-front-container';
import Player from '@/components/player';
import { FaAngleDoubleDown } from 'react-icons/fa';

const JumbotronSection = ({ url }: { url: string }) => {
    const handleScroll = () => {
        const section = document.getElementById('detail-work-home');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AppFrontContainer>
            <div data-aos="fade-in" data-aos-delay={500} className="pointer-events-none absolute top-0 left-0 h-screen w-full">
                <Player
                    controls={false}
                    loop
                    url={url}
                    config={{
                        youtube: {
                            playerVars: {
                                modestbranding: 1,
                                showinfo: 0,
                                rel: 0,
                            },
                        },
                    }}
                />
            </div>
            <div onClick={handleScroll} className="absolute right-5 bottom-5 animate-bounce cursor-pointer text-4xl text-white lg:text-6xl">
                <FaAngleDoubleDown />
            </div>
        </AppFrontContainer>
    );
};

export default JumbotronSection;
