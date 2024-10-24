import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRoute } from "../config";

export const getCountriesAction = createAsyncThunk(
  "data/getCountries",
  async (_arg, { extra: api }) => {
    const { data } = await api.get(APIRoute.Countries);
    return data;
  }
);

export const getCountriesByFilterAction = createAsyncThunk(
  "data/getCountriesByFilter",
  async ({ letter, continent }, { extra: api }) => {
    const { data } = await api.get(
      `${APIRoute.Countries}?letter=${letter}&continent${continent}`
    );
    return data;
  }
);

export const getCatalogAction = createAsyncThunk(
  "data/getCatalog",
  async (_arg, { extra: api }) => {
    const { data } = await api.get(APIRoute.Catalog);
    return data;
  }
);

export const getCatalogByPaginateAction = createAsyncThunk(
  "data/getCatalogByPaginate",
  async ({ page, limit }, { extra: api }) => {
    const { data } = await api.get(
      `${APIRoute.Paginate}?page=${page}&limit=${limit}`
    );
    return data;
  }
);

export const fetchFormAction = createAsyncThunk(
  "data/fetchForm",
  async (params, { extra: api }) => {
    const { data } = await api.post(APIRoute.Form, params);
    return data;
  }
);
