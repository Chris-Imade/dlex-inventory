import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Products } from 'renderer/screens';

type TypingProp = string | null;

export interface AppState {
  user: Record<string, any> | undefined;
  token: TypingProp;
  username: TypingProp;
  email: TypingProp;
  password: TypingProp;
  pageIndex: number;
  totalSales: number | undefined;
  workInProgress: number | undefined;
  completedDeals: number | undefined;
  products: Array<Product> | null;
  transactions: Array<Transaction> | null;
  featuredProducts: Array<Product> | null;
  transactionProducts: Array<Product> | null;
  removeTransactionProduct: string | undefined;
  showPass: boolean;
  activeRoute: string;
  serviceProvider: any;
  isSyncing: boolean;
  totalPendingItems: number;
  itemsSynced: number;
}

const initialState: AppState = {
  user: undefined,
  token: null,
  username: null,
  email: null,
  password: null,
  pageIndex: 0,
  totalSales: 0,
  workInProgress: 0,
  completedDeals: 0,
  products: null,
  transactions: null,
  featuredProducts: null,
  transactionProducts: null,
  removeTransactionProduct: undefined,
  showPass: false,
  activeRoute: 'dashboard',
  serviceProvider: null,
  isSyncing: false,
  totalPendingItems: 0,
  itemsSynced: 0,
};


export const appSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<SetUserPayload>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<CountryFilterType>) => {
      state.token = action.payload;
    },
    setUsername: (state, action: PayloadAction<CountryFilterType>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<CountryFilterType>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<CountryFilterType>) => {
      state.password = action.payload;
    },
    setPageIndex: (state, action: PayloadAction<number>) => {
      state.pageIndex = action.payload;
    },
    setTotalSales: (state, action: PayloadAction<number | undefined>) => {
      state.totalSales = action.payload;
    },
    setWorkInProgress: (state, action: PayloadAction<number | undefined>) => {
      state.workInProgress = action.payload;
    },
    setCompletedTasks: (state, action: PayloadAction<number | undefined>) => {
      state.completedDeals = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      if(state.products !== null) {
        state.products = [...state.products, action.payload];
      } else {
        state.products = [action.payload];
      }
    },
    setProducts: (state, action: PayloadAction<Array<Product>>) => {
      state.products = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      if(state.transactions !== null) {
        state.transactions = [...state.transactions, action.payload];
      } else {
        state.transactions = [action.payload];
      }
    },
    setTransactions: (state, action: PayloadAction<Array<Transaction>>) => {
      state.transactions = action.payload;
    },
    setFeaturedProducts: (state, action: PayloadAction<FeaturedPayload>) => {
      state.featuredProducts = action.payload;
    },
    setTransactionProducts: (state, action: PayloadAction<TransProductPayload>) => {
      if(state.transactionProducts !== null) {
        const duplicates = state.transactionProducts.filter((product) => product.name === action.payload[0].name);

        if(duplicates.length === 0) {
          state.transactionProducts = [...state.transactionProducts, ...action.payload];
        }
      } else {
        state.transactionProducts = [...action.payload];
      }
    },
    setRemoveTransactionProduct: (state, action: PayloadAction<string | undefined>) => {
      if(state.transactionProducts !== null) {
        const deletedList = state.transactionProducts?.filter((product) => product.name !== action.payload);

        state.transactionProducts = deletedList;
      }
    },
    setShowPass: (state) => {
      state.showPass = !state.showPass;
    },
    setActiveRoute: (state, action: PayloadAction<string>) => {
      state.activeRoute = action.payload;
    },
    setServiceProvider: (state, action: PayloadAction<any>) => {
      state.serviceProvider = action.payload;
    },
    startSync: (state) => {
      state.isSyncing = true;
    },
    stopSync: (state) => {
      state.isSyncing = false;
      state.itemsSynced = 0;
    },
    setTotalPendingItems: (state, action: PayloadAction<number>) => {
      state.totalPendingItems = action.payload;
    },
    incrementItemsSynced: (state) => {
      state.itemsSynced += 1;
    },
  },
});

export const {
  setAccessToken,
  setToken,
  setUsername,
  setEmail,
  setPassword,
  setPageIndex,
  setTotalSales,
  setWorkInProgress,
  setCompletedTasks,
  addProduct,
  setProducts,
  addTransaction,
  setFeaturedProducts,
  setTransactions,
  setTransactionProducts,
  setRemoveTransactionProduct,
  setShowPass,
  setActiveRoute,
  setServiceProvider,
  startSync,
  stopSync,
  setTotalPendingItems,
  incrementItemsSynced
} = appSlice.actions;

export default appSlice.reducer;

