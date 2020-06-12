import { reducer,ManagementReducerState } from './ManagementReducer'
import { ActionReducerMap } from '@ngrx/store'

interface AppState {
  ManagementReducer: ManagementReducerState
}

export const reducers: ActionReducerMap<AppState> = {
  ManagementReducer: reducer
}
