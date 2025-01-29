import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { SetURLSearchParams } from 'react-router'

interface PaginationProps {
  page: string,
  totalPages: number,
  setSearchParams: SetURLSearchParams
}

export function Pagination ({ page, totalPages, setSearchParams }: PaginationProps) {
  function handleNextPage () {
    setSearchParams(state => {
      state.set('page', (parseInt(page) + 1).toString())
      return state
    })
  }

  function handlePreviousPage () {
    setSearchParams(state => {
      state.set('page', (parseInt(page) - 1).toString())
      return state
    })
  }

  return (
    <div className='flex items-center justify-between'>
      <button
        disabled={Number(page) <= 1}
        className='rounded bg-blue-600 p-2 font-bold text-white hover:bg-blue-500 disabled:bg-gray-700 disabled:font-normal disabled:text-zinc-300'
        onClick={handlePreviousPage}
      >
        <ChevronsLeft />
      </button>
      <span className='text-zinc-300'>{`Page ${page} of ${totalPages}`}</span>
      <button
        disabled={Number(page) >= totalPages}
        className='rounded bg-blue-600 p-2 font-bold text-white hover:bg-blue-500 disabled:bg-gray-700 disabled:font-normal disabled:text-zinc-300'
        onClick={handleNextPage}
      >
        <ChevronsRight />
      </button>
    </div>
  )
}
