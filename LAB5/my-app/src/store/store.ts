// src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from './slices/filtersSlice'

// главный Redux store приложения
export const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
  // DevTools включены по умолчанию в development
})

// типы для useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
