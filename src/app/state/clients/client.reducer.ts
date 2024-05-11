import { createReducer, on } from '@ngrx/store';
import { Client } from '../../models/client.model';
import {
  createClient,
  createClientFailure,
  createClientSuccess,
  deleteClientSuccess,
  initializeClientData,
} from './client.actions';

export interface ClientState {
  clients: Client[];
  loading: boolean;
  error: any;
}

export const initialClientState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

export const clientReducer = createReducer(
  initialClientState,
  on(initializeClientData, (state, { clients }) => ({
    ...state,
    clients: [...state.clients, ...clients],
  })),
  on(createClient, (state) => ({ ...state, loading: true, error: null })),
  on(createClientFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(createClientSuccess, (state, { client }) => ({
    ...state,
    clients: [...state.clients, client],
  })),
  on(deleteClientSuccess, (state, { clientNumber }) => ({
    ...state,
    clients: state.clients.filter((c) => c.id !== clientNumber),
  }))
);
