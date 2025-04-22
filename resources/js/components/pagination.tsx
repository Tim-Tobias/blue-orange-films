import { useState } from "react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
    totalPages?: number
    initialPage?: number
    onPageChange?: (page: number) => void
}

export default function Pagination({ totalPages = 10, initialPage = 1, onPageChange }: PaginationProps) {
    const [currentPage, setCurrentPage] = useState(initialPage)

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
        onPageChange?.(page)
    }

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            <Button
                variant="outline"
                className="rounded-full px-4 h-9 text-xs font-medium uppercase"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </Button>

            <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        className="w-8 h-8 rounded-md"
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </Button>
                ))}
            </div>

            <Button
                variant="outline"
                className="rounded-full px-4 h-9 text-xs font-medium uppercase"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </Button>
        </div>
    )
}
