import { createAction, props } from '@ngrx/store';
import { Account } from '../../models/account.model';

export const createAccount = createAction(
  '[Account] Create Account',
  props<{ account: Account }>()
);

export const createAccountSuccess = createAction(
  '[Account] Create Account Success',
  props<{ account: Account }>()
);

export const createAccountFailure = createAction(
  '[Account] Create Account Failure',
  props<{ error: unknown }>()
);

export const getAccounts = createAction(
  '[Account] Get Accounts',
  props<{ clientNumber: number }>()
);

export const getAccountSuccess = createAction(
  '[Account] Get Account Success',
  props<{ accounts: Account[] }>()
);
