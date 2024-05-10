import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientState } from './client.reducer';

export const selectClientsFeature =
  createFeatureSelector<ClientState>('clients');

export const selectClients = createSelector(
  selectClientsFeature,
  (state) => state.clients
);
