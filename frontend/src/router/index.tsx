import {createBrowserRouter} from 'react-router-dom'

import HomeView from '../modules/home/HomeView'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeView/>,
        children: [],
    },
])

export default router
