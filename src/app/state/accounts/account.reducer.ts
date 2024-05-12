import { createReducer, on } from '@ngrx/store';
import { Account } from '../../models/account.model';
import {
  createAccount,
  createAccountFailure,
  createAccountSuccess,
  getAccountSuccess,
} from './account.action';

export interface AccountState {
  accounts: Account[];
  loading: boolean;
  error: any;
}

export const initialAccountState: AccountState = {
  accounts: [],
  loading: false,
  error: null,
};

export const accountReducer = createReducer(
  initialAccountState,
  on(createAccount, (state) => ({ ...state, loading: true, error: null })),
  on(createAccountSuccess, (state, { account }) => ({
    ...state,
    accounts: [...state.accounts, account],
  })),
  on(createAccountFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(getAccountSuccess, (state, { accounts }) => ({
    ...state,
    accounts,
  }))
);
