import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface CategoryFilterProps {
    categories: string[];
    selected: string;
    onSelect: (category: string) => void;
}

const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => {
    return (
        <div data-aos="fade-left" data-aos-delay="500" className="mb-6 flex flex-wrap justify-center gap-3">
            <Button
                className={`rounded border px-3 py-1 ${selected === 'All' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                onClick={() => onSelect('All')}
            >
                All
            </Button>

            {categories.map((category, index) => (
                <Button
                    key={index}
                    className={cn(
                        `rounded border px-3 py-1`,
                        selected === category ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100',
                    )}
                    onClick={() => onSelect(category)}
                >
                    {category}
                </Button>
            ))}
        </div>
    );
};

export default CategoryFilter;
