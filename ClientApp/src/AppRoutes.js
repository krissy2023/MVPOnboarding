
import { CustomersList } from "./components/Customer/CustomersList";

import { Home } from "./components/Home";
import { SalesList } from "./components/Sales/SalesList";



const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/Customer/CustomersList',
        element: <CustomersList />
    },
    {
        path: '/Sales',
        element: <SalesList />
    },
];

export default AppRoutes;
