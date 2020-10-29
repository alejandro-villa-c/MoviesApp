import { Injectable } from '@angular/core';
import { GenericResponse } from 'src/app/core/models/GenericResponse';
import { HttpService } from 'src/app/core/services/http.service';
import { AccountResponse } from '../models/AccountResponse';
import { LoginRequestBody } from '../models/LoginRequestBody';
import { LogoutResponse } from '../models/LogoutResponse';
import { SessionRequestBody } from '../models/SessionRequestBody';
import { SessionResponse } from '../models/SessionResponse';
import { TokenResponse } from '../models/TokenResponse';

@Injectable()
export class AuthenticationService {
    private authenticationPath = 'authentication';
    private tokenPath = 'token';
    private sessionPath = 'session';
    private accountPath = 'account';

    constructor(
        private httpService: HttpService
    ) {}

    public async getRequestToken(): Promise<GenericResponse<TokenResponse>> {
        return await this.httpService.get<TokenResponse>(`${this.authenticationPath}/${this.tokenPath}/new`);
    }

    public async login(loginRequestBody: LoginRequestBody): Promise<GenericResponse<TokenResponse>> {
        return await this.httpService.post<TokenResponse, LoginRequestBody>(`${this.authenticationPath}/${this.tokenPath}/validate_with_login`, loginRequestBody);
    }

    public async getSessionId(sessionRequestBody: SessionRequestBody): Promise<GenericResponse<SessionResponse>> {
        return await this.httpService.post<SessionResponse, SessionRequestBody>(
            `${this.authenticationPath}/${this.sessionPath}/new`, sessionRequestBody);
    }

    public async getAccountDetails(sessionId: string): Promise<GenericResponse<AccountResponse>> {
        return await this.httpService.get<AccountResponse>(`${this.accountPath}?session_id=${sessionId}`);
    }

    public async logout(sessionId: string): Promise<GenericResponse<LogoutResponse>> {
        return await this.httpService.delete<LogoutResponse>(`${this.authenticationPath}/${this.sessionPath}?session_id=${sessionId}`);
    }
}
