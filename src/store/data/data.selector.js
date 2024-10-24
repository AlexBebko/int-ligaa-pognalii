import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../config';

export const getCountries = createSelector(
    (state) => state[NameSpace.Data],
    (state) => state.countries
);

export const getCatalog = createSelector(
    (state) => state[NameSpace.Data],
    (state) => {
        const { continents, countries } = state.filters;
        const countryList = state.countries;
        const catalog = state.catalog;

        const asdf = catalog.filter((item) => {
            if (
                continents.length > 0 &&
                countries.length === 0 &&
                countryList.find((countryByList) => {
                    if (
                        item.country.find(
                            (countryByCard) =>
                                countryByCard.name === countryByList.name &&
                                continents.includes(countryByList.continent)
                        )
                    ) {
                        return true;
                    }
                })
            ) {
                return true;
            }

            if (
                countries.length > 0 &&
                countryList.find((countryByList) => {
                    if (
                        item.country.find(
                            (countryByCard) =>
                                countryByCard.name === countryByList.name &&
                                countries.includes(countryByList.name)
                        )
                    ) {
                        return true;
                    }
                })
            ) {
                return true;
            }

            if (continents.length === 0 && countries.length === 0) {
                return true;
            }
        });

        // console.log(asdf)

        return asdf;
    }
);

export const getStatusData = createSelector(
    (state) => state[NameSpace.Data],
    (state) => state.statusData
);

export const getStatusFetchForm = createSelector(
    (state) => state[NameSpace.Data],
    (state) => state.statusFetchForm
);

export const getStatusCountriesLoading = createSelector(
    (state) => state[NameSpace.Data],
    (state) => state.countriesLoading
);

export const getStatusCatalogLoading = createSelector(
    (state) => state[NameSpace.Data],
    (state) => state.catalogLoading
);

export const getFilters = createSelector(
    (state) => state[NameSpace.Data],
    (state) => state.filters
);
