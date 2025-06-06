export interface CardServiceProps {
    imageUrl: string;
    title: string;
}

const CardService = ({ title }: CardServiceProps) => {
    return (
        <div className="text-center">
            {/* <div className="mx-auto flex h-62 w-full items-center justify-center overflow-hidden bg-gray-200 md:w-62">
                <img src={imageUrl} alt={title} className="h-full w-full object-cover transition-all hover:scale-110" />
            </div> */}
            <h3 className="mt-2 font-semibold">{title}</h3>
        </div>
    );
};

export default CardService;
