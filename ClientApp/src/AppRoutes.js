
import { CustomersList } from "./components/Customer/CustomersList";
import { Home } from "./components/Home";
import { SalesList } from "./components/Sales/SalesList";
import { ProductsList } from "./components/Product/ProductsList";
import { StoresList } from "./components/Store/StoresList";



const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/Customers',
        element: <CustomersList />
    },
    {
        path: '/Sales',
        element: <SalesList />
    },
    {
        path: '/Products',
        element: <ProductsList />
    },
    {
        path: '/Stores',
        element: <StoresList />
    }
];

export default AppRoutes;
