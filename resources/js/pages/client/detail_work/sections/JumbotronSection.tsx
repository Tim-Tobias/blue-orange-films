import AppFrontContainer from '@/components/app-front-container';
import Player from '@/components/player';

const JumbotronSection = ({ url }: { url: string }) => {
    return (
        <AppFrontContainer>
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
        </AppFrontContainer>
    );
};

export default JumbotronSection;
