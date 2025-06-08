import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';
import React, { useState } from 'react';
import Pagination from './pagination';
import { Input } from './ui/input';

export interface Column<T> {
    header: string;
    accessor: string | ((row: T) => React.ReactNode);
    searchable?: boolean;
    sortable?: boolean;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    currentPage: number;
    totalPages: number;
    caption?: string;
}

const DataTable = <T,>({ columns, data, caption, currentPage, totalPages }: DataTableProps<T>) => {
    const [query, setQuery] = useState<Record<string, string>>(() => {
        const params = Object.fromEntries(new URLSearchParams(window.location.search));
        return { ...params };
    });

    const handlePageChange = (page: number) => {
        const newQuery = { ...query, page: String(page) };

        setQuery(newQuery);

        router.visit(window.location.pathname, {
            method: 'get',
            preserveScroll: true,
            preserveState: true,
            data: newQuery,
        });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        const searchable = columns
            .filter((col) => col.searchable)
            .map((col) => (typeof col.accessor === 'string' ? col.accessor : ''))
            .filter(Boolean)
            .join(',');

        const newQuery: Record<string, string> = { ...query };
        delete newQuery.page;

        if (value) {
            newQuery.search = value;
            newQuery.searchable = searchable;
        } else {
            delete newQuery.search;
            delete newQuery.searchable;
        }

        router.visit(window.location.pathname, {
            method: 'get',
            data: newQuery,
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleSortChange = (column: Column<T>) => {
        if (typeof column.accessor !== 'string') return;

        const currentSort = query.sort;
        const currentOrder = query.order || 'asc';

        const newOrder = currentSort === column.accessor && currentOrder === 'asc' ? 'desc' : 'asc';

        const newQuery = {
            ...query,
            sort: column.accessor,
            order: newOrder,
        };

        setQuery(newQuery);

        router.visit(window.location.pathname, {
            method: 'get',
            data: newQuery,
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="mb-6 flex justify-between">
                <div className="flex items-center justify-between gap-4">
                    <Input placeholder="Cari apa saja..." className="w-full max-w-sm" onChange={(e) => handleSearchChange(e)} />
                </div>
            </div>

            <Table>
                {caption && <TableCaption>{caption}</TableCaption>}
                <TableHeader>
                    <TableRow>
                        {columns.map((col, index) => (
                            <TableHead className="font-bold" key={index}>
                                <span className="flex items-center gap-1">
                                    {col.header}{' '}
                                    {col.sortable &&
                                        (query.order === 'asc' ? (
                                            <ArrowUpWideNarrow onClick={() => handleSortChange(col)} className="cursor-pointer" size="12px" />
                                        ) : (
                                            <ArrowDownWideNarrow onClick={() => handleSortChange(col)} className="cursor-pointer" size="12px" />
                                        ))}
                                </span>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {typeof col.accessor === 'function'
                                            ? col.accessor(row)
                                            : ((row as T)[col.accessor as keyof T] as React.ReactNode)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => handlePageChange(page)} />
        </div>
    );
};

export default DataTable;
