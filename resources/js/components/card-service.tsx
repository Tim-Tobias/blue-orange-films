export interface CardServiceProps {
    imageUrl: string;
    title: string;
    tags: { name: string }[];
}

const CardService = ({ imageUrl, title, tags }: CardServiceProps) => {
    return (
        <div className="text-center">
            <div className="mx-auto flex h-62 w-full md:w-62 items-center justify-center overflow-hidden bg-gray-200">
                <img src={imageUrl} alt={title} className="h-full w-full object-cover transition-all hover:scale-110" />
            </div>
            <h3 className="mt-2 font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">
                {tags.map((tag, index) => {
                    return tag.name + (index < tags.length - 1 ? ' | ' : '');
                })}
            </p>
        </div>
    );
};

export default CardService;
