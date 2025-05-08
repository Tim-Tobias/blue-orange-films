import api from '@/services/axiosClient';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';

interface Option {
    id: number;
    name: string;
}

interface SearchableSelectProps {
    value: string;
    onChange: (value: string) => void;
    endpoint: string;
    placeholder?: string;
}

export const SearchableSelect = ({ value, onChange, placeholder = 'Select...', endpoint }: SearchableSelectProps) => {
    const [search, setSearch] = useState(value);
    const [showDropdown, setShowDropdown] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);

    const fetchOptions = useCallback(
        async (keyword: string) => {
            setLoading(true);
            try {
                const res = await api.get(endpoint, { params: { search: keyword } });
                setOptions(res.data);
            } catch (err) {
                console.error('Failed to fetch from:', endpoint, err);
                setOptions([]);
            } finally {
                setLoading(false);
            }
        },
        [endpoint],
    );

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchOptions(search);
        }, 300);

        return () => clearTimeout(delay);
    }, [search, fetchOptions]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onChange(search);
            setShowDropdown(false);
        }
    };

    return (
        <div className="relative w-full" ref={containerRef}>
            <Input
                type="text"
                value={search}
                placeholder={placeholder}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                }}
                onKeyDown={(e) => handleKeyDown(e)}
                className="w-full rounded-md border px-3 py-2"
            />

            {showDropdown && (
                <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded border bg-white shadow">
                    {loading ? (
                        <li className="px-3 py-2 text-gray-500">Loading...</li>
                    ) : options.length > 0 ? (
                        options.map((opt) => (
                            <li
                                key={opt.id}
                                className="cursor-pointer px-3 py-2 hover:bg-gray-100"
                                onMouseDown={() => {
                                    onChange(opt.name);
                                    setSearch(opt.name);
                                    setShowDropdown(false);
                                }}
                            >
                                {opt.name}
                            </li>
                        ))
                    ) : (
                        <li className="px-3 py-2 text-gray-500">No match</li>
                    )}
                </ul>
            )}
        </div>
    );
};
