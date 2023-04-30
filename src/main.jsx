import ReactDOM from 'react-dom/client';
import './assets/index.css';
import axios from 'axios';

import Home from './pages/Home.jsx';
import Create from './pages/Create.jsx';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/create',
        element: <Create />,
        loader: async () => {
            const ingredients = JSON.parse(localStorage.getItem('ingredients'));

            if (ingredients.length < 5) {
                throw redirect('/');
            }

            return null;
        },
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
