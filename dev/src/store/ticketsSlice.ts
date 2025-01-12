import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { fetchTickets, Ticket } from "../api/ticketsData";
import { RootState } from "./store";

// Адаптер для коллекции билетов
const ticketsAdapter = createEntityAdapter<Ticket>();

// Используем метод getInitialState без `selectId`
const initialState = ticketsAdapter.getInitialState({
  loading: false,
  error: null as string | null,
});

// Асинхронный thunk для загрузки билетов
export const loadTickets = createAsyncThunk("tickets/loadTickets", async () => {
  const response = await fetchTickets();
  return response;
});

// Создание среза
const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addMoreTickets: (state, action) => {
      ticketsAdapter.addMany(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTickets.fulfilled, (state, action) => {
        state.loading = false;
        ticketsAdapter.setAll(state, action.payload);
      })
      .addCase(loadTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки билетов";
      });
  },
});

export const { addMoreTickets } = ticketsSlice.actions;

// Селекторы для работы с адаптером
export const ticketsSelectors = ticketsAdapter.getSelectors<RootState>(
  (state) => state.tickets
);

export default ticketsSlice.reducer;
