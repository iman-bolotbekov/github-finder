import React, { lazy } from 'react'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import RootLayout from './components/RootLayout'
const Home = lazy(() => import('./components/pages/Home'))
const About = lazy(() => import('./components/pages/About'))
const User = lazy(() => import('./components/pages/User'))
const NotFound = lazy(() => import('./components/pages/NotFound'))

const routesJSX = (
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="user/:login" element={<User />} />
    <Route path="*" element={<NotFound />} />
  </Route>
)

const routes = createRoutesFromElements(routesJSX)

const router = createBrowserRouter(routes)

function App() {
  return <RouterProvider router={router} />
}

export default App
