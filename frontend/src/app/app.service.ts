import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BaseUserDto,
  LoginCredentialsDto,
} from '@one-validator-to-rule-them-all/schema';
import { catchError, of, tap } from 'rxjs';

export type LoginStatus = 'idle' | 'loading' | 'success' | 'error';

export interface BackendError {
  message: string;
  statusCode: number;
}

@Injectable({ providedIn: 'root' })
export class AppService {
  private readonly http = inject(HttpClient);

  readonly status = signal<LoginStatus>('idle');
  readonly value = signal<BaseUserDto | null>(null);
  readonly error = signal<BackendError | null>(null);

  login(data: LoginCredentialsDto): void {
    this.status.set('loading');

    this.http
      .post<BaseUserDto>('/api/login', data)
      .pipe(
        tap((response) => {
          this.value.set(response);
          this.status.set('success');
        }),
        catchError((err) => {
          this.error.set(err?.error ?? err);
          this.status.set('error');
          return of(null);
        }),
      )
      .subscribe();
  }
}
