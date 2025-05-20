import { cn } from '@/lib/utils';
import { ProjectCategory } from '@/types';
import { router } from '@inertiajs/react';
import { Button } from './ui/button';

interface CategoryFilterProps {
    categories: ProjectCategory[];
    selected: string;
    onSelect: (category: string) => void;
}

const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => {
    const handleClick = (cat: string) => {
        onSelect(cat);
        router.visit(window.location.pathname, {
            preserveScroll: true,
            preserveState: true,
            only: ['projects'],
            data: { category: cat },
        });
    };

    return (
        <div data-aos="fade-left" data-aos-delay="500" className="mb-6 flex flex-wrap justify-center gap-3">
            <Button
                className={`rounded border px-3 py-1 ${selected === 'all' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                onClick={() => handleClick('all')}
            >
                All
            </Button>

            {categories.map((category, index) => (
                <Button
                    key={index}
                    className={cn(
                        `rounded border px-3 py-1`,
                        selected === category.name ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100',
                    )}
                    onClick={() => handleClick(category.name)}
                >
                    {category.name}
                </Button>
            ))}
        </div>
    );
};

export default CategoryFilter;
