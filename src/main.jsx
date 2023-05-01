import ReactDOM from 'react-dom/client';
import './assets/index.css';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
import Root from './layouts/Root';

// Routes are inside the Root Component
ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
