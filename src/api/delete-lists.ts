import { api } from '../lib/axios'

interface DeleteListsResponse {
  id: string
}

export async function deleteLists ({ id }: DeleteListsResponse) {
  try {
    const response = await api.delete(`/list/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting list:', error)
    throw error
  }
}
