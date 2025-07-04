import { CardServiceProps } from './card-service';

const CardWork = ({ imageUrl, title, client }: Omit<CardServiceProps, 'tag'>) => {
    return (
        <div className="group relative h-full w-full overflow-hidden">
            <img src={imageUrl} className="absolute top-0 left-0 h-full w-full object-cover transition-all group-hover:scale-110" />
            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-30" />
            <div className="relative grid h-full w-full grid-cols-1 text-white">
                <div className="absolute bottom-5 left-5 text-md">
                    <h1 className="font-bold text-xl">{client}</h1>
                    <h1>{title}</h1>
                </div>
            </div>
        </div>
    );
};

export default CardWork;
