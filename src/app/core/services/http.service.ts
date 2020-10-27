import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, mergeMap } from 'rxjs/operators';
import { GenericResponse } from '../models/GenericResponse';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private baseUrl: string = environment.baseUrl;
    private authorizationToken: string = environment.authorizationToken;

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    public async get<T>(requestPath: string, headers: HttpHeaders = new HttpHeaders()): Promise<GenericResponse<T>> {
        return this.handleError(
            this.http.get<T>(`${this.baseUrl}/${requestPath}`,
            { headers: this.appendAuthorizationToken(headers) }));
    }

    public async post<T, K>(requestPath: string, body: K, headers: HttpHeaders = new HttpHeaders()): Promise<GenericResponse<T>> {
        return this.handleError(
            this.http.post<T>(`${this.baseUrl}/${requestPath}`,
            body,
            { headers: this.appendAuthorizationToken(headers) }));
    }

    public async put<T, K>(requestPath: string, body: K, headers: HttpHeaders = new HttpHeaders()): Promise<GenericResponse<T>> {
        return this.handleError(
            this.http.put<T>(`${this.baseUrl}/${requestPath}`,
            body,
            { headers: this.appendAuthorizationToken(headers) }));
    }

    public async delete<T>(requestPath: string, headers: HttpHeaders = new HttpHeaders()): Promise<GenericResponse<T>> {
        return this.handleError(
            this.http.delete<T>(`${this.baseUrl}/${requestPath}`,
            { headers: this.appendAuthorizationToken(headers) }));
    }

    private appendAuthorizationToken(headers: HttpHeaders): HttpHeaders {
        return headers.append('Authorization', `Bearer ${this.authorizationToken}`);
    }

    private handleError<T>(response: Observable<T>): Promise<GenericResponse<T>> {
        return response
            .pipe(
                mergeMap((data: T) => {
                    return Promise.resolve(new GenericResponse<T>(data, true, null));
                }),
                catchError((errorResponse: HttpErrorResponse): Promise<any> => {
                    if (errorResponse.error instanceof ErrorEvent) {
                        console.log(`${errorResponse.status}: ${errorResponse.error.message}`);
                    } else {
                        console.log(`${errorResponse.status}: ${JSON.stringify(errorResponse.error)}`);
                    }
                    this.messageService.add(
                        {key: 'prime-toast', severity: 'error', summary: 'Error', detail: errorResponse.error.status_message}
                    );
                    return Promise.resolve(new GenericResponse<T>(null, false, errorResponse.error.status_message));
                })
            ).toPromise();
    }
}
