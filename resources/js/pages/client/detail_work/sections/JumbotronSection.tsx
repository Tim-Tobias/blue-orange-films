import AppFrontContainer from '@/components/app-front-container';
import Player from '@/components/player';

const JumbotronSection = ({ url }: { url: string }) => {
    return (
        <AppFrontContainer>
            <Player controls={true} url={url} />
        </AppFrontContainer>
    );
};

export default JumbotronSection;
