import { api } from '../lib/axios'
export interface GetListsResponse {
  id: string
  items: string
}

export async function getLists () {
  try {
    const response = await api.get<GetListsResponse[]>('/list')
    return response.data
  } catch (error) {
    console.error('Error getting lists:', error)
    return []
  }
}
