import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { DefaultLayout } from './layouts/DefaultLayout';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
            </Route>

            {/*<Route path="/admin" element={<AdminLayout />}>
                <Route path="/produts" element={<Home />} /> // to access use /admin/products
                <Route path="/history" element={<History />} />
            </Route> */}
        </Routes>
    )
}