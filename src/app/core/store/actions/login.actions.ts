import { createAction, props } from '@ngrx/store';
import { AccountResponse } from 'src/app/features/public/modules/login/models/AccountResponse';

export const setRequestToken = createAction('SetRequestToken', props<{requestToken: string}>());
export const setSessionId = createAction('SetSessionId', props<{sessionId: string}>());
export const setAccountResponse = createAction('SetAccountResponse', props<{accountResponse: AccountResponse}>());
