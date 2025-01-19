import { Trash2 } from 'lucide-react'

import { GetListsResponse } from '../api/get-lists'

interface GetListsComponentsProps {
  getListsFn: GetListsResponse[] | undefined
  handleDeleteList: (id: string) => void
}

export function GetListsComponent ({ getListsFn, handleDeleteList }:GetListsComponentsProps) {
  return (
    <ul className='space-y-6'>
      {getListsFn && getListsFn?.length > 0
        ? getListsFn.map(({ items, id }) => (
          <li
            key={id}
            className='flex items-center justify-between rounded-xl bg-gray-700 px-4 py-3 shadow-md'
          >
            <span className='font-medium text-gray-100 lg:text-lg'>
              {items}
            </span>
            <button
              className='rounded-lg bg-red-600 px-2 py-1 font-semibold text-white shadow transition-all duration-300 hover:bg-red-500 hover:shadow-md'
              onClick={() => handleDeleteList(id)}
            >
              <Trash2 width={16} />
            </button>
          </li>
        ))
        : <p className='text-center italic text-gray-300'>No tasks available at the moment</p>}
    </ul>
  )
}
