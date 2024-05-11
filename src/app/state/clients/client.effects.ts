import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientService } from '../../services/client.service';
import { EMPTY, catchError, map, mergeMap, of } from 'rxjs';
import {
  createClient,
  createClientFailure,
  createClientSuccess,
  deleteClient,
  deleteClientSuccess,
} from './client.actions';

@Injectable()
export class ClientEffects {
  createClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createClient),
      mergeMap((action) =>
        this.clientService.createClient(action.client).pipe(
          map((client) => createClientSuccess({ client })),
          catchError((error) => {
            return of(createClientFailure({ error }));
          })
        )
      )
    )
  );

  deleteClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteClient),
      mergeMap((action) =>
        this.clientService.deleteClient(action.clientNumber).pipe(
          map(() => deleteClientSuccess({ clientNumber: action.clientNumber })),
          catchError((error) => {
            return EMPTY;
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private clientService: ClientService
  ) {}
}
