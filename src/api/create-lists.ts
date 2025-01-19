import { api } from '../lib/axios'

interface CreateListsResponse {
  list: string
}

export async function createLists ({ list }: CreateListsResponse) {
  try {
    await api.post('/list', { list })
  } catch (error) {
    console.error('Error creating list:', error)
    throw error
  }
}
