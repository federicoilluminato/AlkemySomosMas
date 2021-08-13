import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import SlidesServices from '../../Services/SlidesService';

const initialState = {
  slidesList: [],
  slideActive: [],
  loading: false,
  error: '',
};

export const getSlidesList = createAsyncThunk(
  'slides/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await SlidesServices.getAll();
      return response.data.data;
    } catch (error) {
      return rejectWithValue([], error);
    }
  },
);

export const getSlideById = createAsyncThunk('slides/id', async (id, { rejectWithValue }) => {
  try {
    const response = await SlidesServices.getById(id);
    return response.data.data;
  } catch (error) {
    return rejectWithValue([], error);
  }
});

export const createSlide = createAsyncThunk('slide/create', async (slide, { rejectWithValue }) => {
  try {
    const response = await SlidesServices.create(slide);
    return response.data.data;
  } catch (error) {
    return rejectWithValue([], error);
  }
});

const slidesSlice = createSlice({
  name: 'slides',
  initialState,
  reducers: {},
  extraReducers: {
    [getSlidesList.pending]: (state, action) => {
      state.loading = true;
    },
    [getSlidesList.fulfilled]: (state, { payload }) => {
      state.slidesList = payload;
      state.loading = false;
      state.error = '';
    },
    [getSlidesList.rejected]: (state, { payload, error }) => {
      state.slidesList = payload;
      state.error = error;
      state.loading = false;
    },

    [getSlideById.pending]: (state, action) => {
      state.loading = true;
    },
    [getSlideById.fulfilled]: (state, { payload }) => {
      state.slideActive = payload;
      state.loading = false;
      state.error = '';
    },
    [getSlideById.rejected]: (state, { payload, error }) => {
      state.slideActive = payload;
      state.error = error;
      state.loading = false;
    },

    [createSlide.pending]: (state, action) => {
      state.loading = true;
    },

    [createSlide.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.slidesList = [...state.slidesList, payload];
    },
    [createSlide.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slidesSlice.reducer;
