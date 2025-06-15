import AppFrontContainer from '@/components/app-front-container';
import Player from '@/components/player';

const JumbotronSection = ({ url }: { url: string }) => {
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
        </AppFrontContainer>
    );
};

export default JumbotronSection;
