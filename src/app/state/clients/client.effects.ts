import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientService } from '../../services/client.service';
import { EMPTY, catchError, map, mergeMap, of } from 'rxjs';
import {
  createClient,
  createClientFailure,
  createClientSuccess,
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
  constructor(
    private actions$: Actions,
    private clientService: ClientService
  ) {}
}
