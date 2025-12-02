// src/slices/filtersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// тип фильтров на будущее (имя + диапазоны)
export interface BiomarkerFilters {
  name: string
  // здесь потом добавим dateFrom, dateTo, priceFrom, priceTo
}

const initialState: BiomarkerFilters = {
  name: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setNameFilter(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    resetFilters(state) {
      state.name = ''
    },
  },
})

export const { setNameFilter, resetFilters } = filtersSlice.actions

// селектор для чтения фильтра
export const selectBiomarkerFilters = (state: RootState) => state.filters

export default filtersSlice.reducer
