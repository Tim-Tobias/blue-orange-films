import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, siblingCount = 1 }) => {
    const DOTS = '...';

    const getPageNumbers = () => {
        const totalPageNumbers = siblingCount * 2 + 5;

        if (totalPages <= totalPageNumbers) {
            return [...Array(totalPages)].map((_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        const pages: (number | string)[] = [];

        if (!shouldShowLeftDots && shouldShowRightDots) {
            for (let i = 1; i <= 3 + 2 * siblingCount; i++) pages.push(i);
            pages.push(DOTS, totalPages);
        } else if (shouldShowLeftDots && !shouldShowRightDots) {
            pages.push(1, DOTS);
            for (let i = totalPages - (2 * siblingCount + 2); i <= totalPages; i++) pages.push(i);
        } else if (shouldShowLeftDots && shouldShowRightDots) {
            pages.push(1, DOTS);
            for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) pages.push(i);
            pages.push(DOTS, totalPages);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="mt-4 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                &laquo;
            </Button>

            {pages.map((page, index) =>
                typeof page === 'number' ? (
                    <Button
                        key={index}
                        variant={page === currentPage ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onPageChange(page)}
                        className={clsx({ 'font-bold': page === currentPage })}
                    >
                        {page}
                    </Button>
                ) : (
                    <span key={index} className="text-muted-foreground px-2 text-sm">
                        {page}
                    </span>
                ),
            )}

            <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                &raquo;
            </Button>
        </div>
    );
};

export default Pagination;
