import { createSlice, current } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../config';
import {
    fetchFormAction,
    getCatalogAction,
    getCatalogByPaginateAction,
    getCountriesAction,
    getCountriesByFilterAction,
} from '../api-actions';
import { sortCountries } from '../../utils/common';
import { saveToken } from '../../services/token';
import { toast } from 'react-toastify';

const initialState = {
    countries: [],
    catalog: [],
    countriesLoading: false,
    catalogLoading: false,
    filters: {
        continents: [],
        countries: [],
    },
    statusData: Status.Idle,
    statusFetchForm: Status.Idle,
};

const dataSlice = createSlice({
    name: NameSpace.Data,
    initialState,
    reducers: {
        setStatusData: (state, { payload }) => {
            state.statusData = payload;
        },
        setStatusFetchForm: (state, { payload }) => {
            state.statusFetchForm = payload;
        },
        setFiltersCountriesContinent: (state, { payload }) => {
            state.filters.continents = [...payload.map((item) => item.name)];
            state.filters.countries = [];
        },
        setFiltersCountries: (state, { payload }) => {
            const filterCountries = current(state.filters.countries);

            if (filterCountries.includes(payload)) {
                state.filters.countries = [
                    ...filterCountries.filter((item) => item !== payload),
                ];
            } else {
                state.filters.countries = [...filterCountries, payload];
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getCountriesAction.pending, (state) => {
                state.countriesLoading = false;
                state.statusData = Status.Loading;
            })
            .addCase(getCountriesAction.fulfilled, (state, { payload }) => {
                state.countries = [...payload.sort(sortCountries)];
                state.countriesLoading = true;
                state.statusData = Status.Success;
            })
            .addCase(getCountriesAction.rejected, (state) => {
                state.countriesLoading = false;
                state.statusData = Status.Error;

                toast.error('Не удалось получить список стран');
            })
            .addCase(getCountriesByFilterAction.pending, (state) => {
                state.countriesLoading = false;
                state.statusData = Status.Loading;
            })
            .addCase(
                getCountriesByFilterAction.fulfilled,
                (state, { payload }) => {
                    state.countries = [...payload.sort(sortCountries)];
                    state.countriesLoading = true;
                    state.statusData = Status.Success;
                }
            )
            .addCase(getCountriesByFilterAction.rejected, (state) => {
                state.countriesLoading = false;
                state.statusData = Status.Error;

                toast.error('Не удалось получить список стран');
            })
            .addCase(getCatalogAction.pending, (state) => {
                state.catalogLoading = false;
                state.statusData = Status.Loading;
            })
            .addCase(getCatalogAction.fulfilled, (state, { payload }) => {
                state.catalog = payload;
                state.catalogLoading = true;
                state.statusData = Status.Success;
            })
            .addCase(getCatalogAction.rejected, (state) => {
                state.catalogLoading = false;
                state.statusData = Status.Error;

                toast.error('Не удалось получить данные');
            })
            .addCase(getCatalogByPaginateAction.pending, (state) => {
                state.statusData = Status.Loading;
            })
            .addCase(
                getCatalogByPaginateAction.fulfilled,
                (state, { payload }) => {
                    state.catalog = payload.data;
                    state.statusData = Status.Success;
                }
            )
            .addCase(getCatalogByPaginateAction.rejected, (state) => {
                state.statusData = Status.Error;
            })
            .addCase(fetchFormAction.pending, (state) => {
                state.statusFetchForm = Status.Loading;
            })
            .addCase(fetchFormAction.fulfilled, (state, { payload }) => {
                saveToken(payload.token);
                state.statusFetchForm = Status.Success;
            })
            .addCase(fetchFormAction.rejected, (state) => {
                state.statusFetchForm = Status.Error;

                toast.error('Не удалось отправить форму');
            });
    },
});

export const {
    setStatusData,
    setStatusFetchForm,
    setFiltersCountriesContinent,
    setFiltersCountries,
} = dataSlice.actions;

export default dataSlice.reducer;
