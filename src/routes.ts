import { createBrowserRouter, useSearchParams } from 'react-router'

import { TodoManager } from './pages/todo-manager'

export const router = createBrowserRouter([
  {
    path: '/list',
    Component: TodoManager,
  },
])
