import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-route';
import { Route, Routes } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../config';
import MainPage from '../../pages/main';
import CatalogPage from '../../pages/catalog';
import Layout from '../layout';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { getCountriesAction } from '../../store/api-actions';
import { getStatusCountriesLoading } from '../../store/data/data.selector';

function App() {
    const dispatch = useAppDispatch();
    const statusCountriesLoading = useAppSelector(getStatusCountriesLoading);

    useEffect(() => {
        if (!statusCountriesLoading) {
            dispatch(getCountriesAction());
        }
    }, [dispatch, statusCountriesLoading]);

    return (
        <HelmetProvider>
            <HistoryRouter history={browserHistory}>
                <Routes>
                    <Route path={AppRoute.Root} element={<Layout />}>
                        <Route index element={<MainPage />} />
                        <Route
                            path={AppRoute.Catalog}
                            element={<CatalogPage />}
                        />
                    </Route>
                </Routes>
            </HistoryRouter>
        </HelmetProvider>
    );
}

export default App;
