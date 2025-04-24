import { AppFrontWrapper } from '@/components/app-front-wrapper';
import { projectCredits } from '../data';
import Player from '@/components/player';

const workDetaiList = [
    {
        imageUrl: 'https://picsum.photos/id/250/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/251/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/252/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/253/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/254/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/255/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/256/200/300',
    },
    {
        imageUrl: 'https://picsum.photos/id/257/200/300',
    },
];

const InfoSection = () => {
    return (
        <AppFrontWrapper className="space-y-24">
            <div className="px-6 py-10">
                <div className="text-2xl font-bold text-orange-400">{projectCredits.title}</div>
                <p className="text-sm">{projectCredits.subtitle}</p>
                <p className="mt-2 text-sm">{projectCredits.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-6 text-sm md:grid-cols-3 lg:grid-cols-6">
                    {projectCredits.credits.map((credit, idx) => (
                        <div key={idx}>
                            <p className="font-semibold text-orange-400">{credit.role}</p>
                            {credit.names.map((name, i) => (
                                <p key={i} className="">
                                    {name}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-[550px]">
                <Player
                    controls={true}
                    url="https://www.dropbox.com/scl/fi/eg0c3th4vyjnnz09cwxam/22512-328261507_tiny.mp4?rlkey=sk0uvs93a3uby17qbzdx1c3cx&raw=1"
                />
            </div>

            <div className="space-y-5">
                <h5 className="text-center text-2xl font-semibold">Pictures</h5>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {workDetaiList.map((item, val) => (
                        <div className="group h-full w-full cursor-pointer overflow-hidden">
                            <img className="h-full w-full object-cover transition-all group-hover:scale-110" src={item.imageUrl} alt="" key={val} />
                        </div>
                    ))}
                </div>
            </div>
        </AppFrontWrapper>
    );
};

export default InfoSection;
