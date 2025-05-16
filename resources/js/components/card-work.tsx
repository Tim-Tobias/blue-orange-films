import { CardServiceProps } from './card-service';

const CardWork = ({ imageUrl, tags }: Omit<CardServiceProps, 'title'>) => {
    return (
        <div className="group relative h-[350px] w-full overflow-hidden">
            <img src={imageUrl} className="absolute top-0 left-0 h-full w-full object-cover transition-all group-hover:scale-110" />
            <div className="absolute top-0 left-0 h-full w-full bg-black opacity-30" />
            <div className="relative grid h-full w-full grid-cols-1 items-end justify-items-center pb-5">
                <div className="text-white">
                    {tags.map((cat, index) => (
                        <span className="text-shadow-lg/30 text-lg font-semibold" key={index}>
                            {cat.name}
                            {index < tags.length - 1 && ' | '}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardWork;
