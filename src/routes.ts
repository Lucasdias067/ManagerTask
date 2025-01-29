import { createBrowserRouter } from 'react-router'

import { TodoManager } from './pages/todo-manager'

export const router = createBrowserRouter([
  {
    path: '/list',
    Component: TodoManager,
  },
])
