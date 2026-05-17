import { Injectable, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { LoginCredentialsDto } from '@one-validator-to-rule-them-all/schema';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly http = inject(HttpClient);

  // This signal will hold the login credentials and trigger the httpResource when set
  private readonly loginTrigger = signal<LoginCredentialsDto | null>(null);

  // Modern Resource API for managing the login state
  loginResource = httpResource(() => {
    const credentials = this.loginTrigger();
    console.log('Resource triggered with data:', credentials); // Debug log
    // If no data, do not initiate a request (undefined)
    if (!credentials) return undefined;

    // POST request configuration
    return {
      url: '/api/login',
      method: 'POST',
      body: credentials,
    };
  });

  /**
   * Login method that sets the loginTrigger signal, which in turn triggers the httpResource to make the POST request.
   * @param data The login credentials
   */
  login(data: LoginCredentialsDto): void {
    console.log('Logging in with credentials:', data);
    this.loginTrigger.set(data);
  }

  /**
   * Reset the login state
   */
  reset(): void {
    this.loginTrigger.set(null);
  }
}
