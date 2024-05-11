import { createAction, props } from '@ngrx/store';
import { Client } from '../../models/client.model';

export const createClient = createAction(
  '[Client] Create Client',
  props<{ client: Client }>()
);

export const createClientSuccess = createAction(
  '[Client] Create Client Success',
  props<{ client: Client }>()
);

export const createClientFailure = createAction(
  '[Client] Create Client Failure',
  props<{ error: unknown }>()
);

export const initializeClientData = createAction(
  '[Client] Load Initial Client Data',
  props<{ clients: Client[] }>()
);

export const editClient = createAction(
  '[Client] Edit Client',
  props<{ client: Client }>()
);

export const editClientSuccess = createAction(
  '[Client] Edit Client Success',
  props<{ client: Client }>()
);

export const deleteClient = createAction(
  '[Client] Delete Client',
  props<{ clientNumber: string }>()
);

export const deleteClientSuccess = createAction(
  '[Client] Delete Client Success',
  props<{ clientNumber: string }>()
);
