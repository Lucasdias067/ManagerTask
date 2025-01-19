import { zodResolver } from '@hookform/resolvers/zod/src/zod.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronsLeft, ChevronsRight, CirclePlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import z from 'zod'

import { createLists } from '../api/create-lists'
import { deleteLists } from '../api/delete-lists'
import { getLists } from '../api/get-lists'
import { GetListsComponent } from '../components/getListsComponent'
import { queryClient } from '../lib/react-query'

const listInputSchema = z.object({
  list: z.string({ message: 'Must be a valide value' })
    .nonempty({ message: 'Field is empty' })
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, { message: 'Field cannot be empty' })
})

type ListInput = z.infer<typeof listInputSchema>

const PER_PAGE = 6

export function TodoManager () {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ListInput>({
    resolver: zodResolver(listInputSchema),
  })

  const [searchParams, setSearchParams] = useSearchParams()

  const page = searchParams.get('page') || '1'
  const pages = z.coerce.number().transform(val => val - 1).parse(page)

  const { data: getListsFn, refetch, } = useQuery({
    queryKey: ['getLists'],
    queryFn: getLists,
    staleTime: 1000 * 60 * 2
  })

  const { mutateAsync: createListsFn } = useMutation({
    mutationKey: ['createLists'],
    mutationFn: createLists,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getLists'] })
      refetch()
    },
    onError: (error, variables) => {
      window.alert(`An error occurred while creating the list: the item '${variables.list}' already exists`)
      reset()
      throw new Error(error.message)
    },
  })

  const { mutateAsync: deleteListsFn } = useMutation({
    mutationKey: ['deleteLists'],
    mutationFn: deleteLists,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getLists'] })
      refetch()
    }
  })

  const startIndex = pages * PER_PAGE
  const currentPageList = getListsFn?.slice(startIndex, startIndex + PER_PAGE)
  const totalPages = (getListsFn && getListsFn?.length > 0) ? Math.ceil(getListsFn?.length / PER_PAGE) : 1

  async function handleCreateList (data: ListInput) {
    await createListsFn({ list: data.list })
    reset({ list: '' })
  }

  async function handleDeleteList (id: string) {
    try {
      await deleteListsFn({ id })
    } catch (error) {
      console.error('Error deleting list:', error)
    }
  }

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
    <div className='flex min-h-screen items-center justify-center bg-gray-900'>
      <div className='mx-4 my-6 w-full max-w-2xl space-y-8 rounded-2xl bg-gray-800 p-12 shadow-2xl'>
        <h1 className='text-center text-5xl font-extrabold text-gray-100 drop-shadow-lg'>
          ToDo Manager
        </h1>
        <div>
          <form className='flex items-center space-x-2' onSubmit={handleSubmit(handleCreateList)}>
            <input
              type='text'
              className='w-full rounded-xl border border-gray-700 bg-gray-800 px-6 py-4 text-gray-200 shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-600'
              placeholder='Add a new task'
              {...register('list')}
            />
            <button
              className='rounded-xl bg-blue-600 px-6 py-4 font-semibold text-gray-100 shadow-lg transition-all duration-300 hover:bg-blue-500 hover:shadow-xl'
              type='submit'
            >
              <CirclePlus />
            </button>
          </form>
          {errors.list && (
            <span className='ml-1 mt-1 block font-semibold text-red-500'> {errors.list.message} </span>
          )}
        </div>

        <GetListsComponent getListsFn={currentPageList} handleDeleteList={handleDeleteList} />

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
      </div>
    </div>
  )
}
