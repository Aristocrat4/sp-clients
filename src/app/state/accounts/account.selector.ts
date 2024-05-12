import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from './account.reducer';

export const selectAccountsFeature =
  createFeatureSelector<AccountState>('accounts');

export const selectAccounts = createSelector(
  selectAccountsFeature,
  (state) => state.accounts
);
