import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import NotFound from './pages/NotFound/NotFound';
import ProductActionPage from './pages/ProductActionPage/ProductActionPage';
import Login from './pages/Login/Login';
import Payment from './pages/Payment/Payment';
import Transfer from './pages/Transfer/Transfer';
import Confirm from './pages/Confirm/Login';
import User from './pages/User/User';
import Register from './pages/Register/Register';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/user',
        exact: false,
        main: () => <User />
    },
    {
        path: '/product/add',
        exact: false,
        main: ({ location, history }) => <ProductActionPage location={location} history={history} />
    },
    {
        path: '/product/:id/edit',
        exact: false,
        main: ({ match, history }) => <ProductActionPage match={match} history={history} />
    },
    {
        path: '/login',
        exact: false,
        main: () => <Login />
    },
    {
        path: '/register',
        exact: false,
        main: () => <Register />
    },
    {
        path: '/payment',
        exact: false,
        main: () => <Payment />
    },
    {
        path: '/transfer',
        exact: false,
        main: () => <Transfer />
    },
    {
        path: '/confirm',
        exact: false,
        main: () => <Confirm />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />
    }
];

export default routes;