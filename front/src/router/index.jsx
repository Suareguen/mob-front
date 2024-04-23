import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Root from '../layouts/mainLayout'
import SignUp from '../pages/SignUp/SignUp'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/signUp',
        element: <SignUp />
      }
    ]
  }
])

export default router
