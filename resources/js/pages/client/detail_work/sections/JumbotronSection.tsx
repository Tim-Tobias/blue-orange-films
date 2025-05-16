import AppFrontContainer from '@/components/app-front-container';
import Player from '@/components/player';

const JumbotronSection = () => {
    return (
        <AppFrontContainer>
            <Player
                controls={true}
                url="https://www.dropbox.com/scl/fi/eg0c3th4vyjnnz09cwxam/22512-328261507_tiny.mp4?rlkey=sk0uvs93a3uby17qbzdx1c3cx&raw=1"
            />
        </AppFrontContainer>
    );
};

export default JumbotronSection;
