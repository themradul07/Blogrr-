import { calculatePageNumbers } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ChevronRightIcon , ChevronLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

type Props = {
    totalPages : number;
    currentPage: number;
    pageNeighbors?: number;
    className ?: string;
}

const Pagination = ({totalPages, currentPage , pageNeighbors=1, className}: Props)=>{
 
    const pageNumbers = calculatePageNumbers({pageNeighbors, currentPage, totalPages})
    return (

        <div className={`flex items-center justify-center gap-2 ${className}`}>

            {/* Left button */}
            {currentPage !== 1 && (
                <button className={cn("rounded-md py-2 px-2")}>
                    <Link href={`?page=${currentPage-1}`}>
                        <ChevronLeftIcon className="w-4"/>
                    </Link>
                </button>)
            }

            {pageNumbers.map((page, index)=>(
                <button key={index}
                className={cn("px-3 py-1 rounded-md transition hover:text-sky-600",{
                    "": currentPage !== page && page !=='...',
                    "bg-blue-500 text-white rounded-full" : currentPage=== page,
                    "cursor-not-allowed":page==='...'
                })}>
                    {page==='...'?'...':
                    <Link href={`?page=${page}`}>{page}</Link>}
                </button>
            ))}

            {/* next page icon */}
            {currentPage !== totalPages && <button className="rounded-md  py-2 px-2">
                <Link href={`?page=${currentPage+1}`}><ChevronRightIcon className="w-4"/></Link>
                </button>}


        </div>
    )
}

export default Pagination;