import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountService } from '../../services/account.service';
import {
  createAccount,
  createAccountFailure,
  createAccountSuccess,
  getAccountSuccess,
  getAccounts,
} from './account.action';
import { EMPTY, catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AccountEffects {
  getAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAccounts),
      mergeMap((action) =>
        this.accountService.getAllAccounts().pipe(
          map((allAccounts) =>
            allAccounts.filter(
              (account) => account.clientNumber === action.clientNumber
            )
          ),
          map((accounts) => getAccountSuccess({ accounts })),
          catchError((error) => {
            // Handle error
            return EMPTY;
          })
        )
      )
    )
  );

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAccount),
      mergeMap((account) =>
        this.accountService.createAccount(account.account).pipe(
          map((account) => createAccountSuccess({ account })),
          catchError((error) => of(createAccountFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) {}
}
