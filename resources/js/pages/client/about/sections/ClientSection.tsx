import { AppFrontWrapper } from '@/components/app-front-wrapper';

const clients = [
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

const ClientSection = () => {
    return (
        <AppFrontWrapper>
            <div className="space-y-10 py-12">
                <h3 className="text-center text-2xl font-bold uppercase">Our Client</h3>

                <div className="grid grid-cols-2 place-items-center gap-5 md:grid-cols-4">
                    {clients.map((val) => (
                        <img className="h-34 w-34 object-cover transition-all hover:opacity-60" src={val.imageUrl} alt="logo" />
                    ))}
                </div>
            </div>
        </AppFrontWrapper>
    );
};

export default ClientSection;
