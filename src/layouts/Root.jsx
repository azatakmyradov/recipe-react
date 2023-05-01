import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './../pages/Home';
import Create from './../pages/Create';

export default function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </BrowserRouter>
    );
}
