import { provideIcons } from '@ng-icons/core';
import {
  lucideCheck,
  lucideMailX,
  lucideX,
  lucideAlertCircle,
} from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  form,
  FormRoot,
  FormField,
  validateStandardSchema,
} from '@angular/forms/signals';
import { LoginCredentialsSchema } from '@one-validator-to-rule-them-all/shared/schema';
import {
  invalidLoginCredentials,
  invalidLoginCredentialsBadEmail,
  validLoginCredentials,
} from '@one-validator-to-rule-them-all/testing';
import { DebugPanelComponent } from './debug/debug-panel';
import { AppService } from './app.service';
import {
  ZodTransformPipeAll,
  ZodTransformPipFirst,
} from '@one-validator-to-rule-them-all/validation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HlmCardImports,
    HlmLabelImports,
    HlmInputImports,
    HlmButtonImports,
    HlmFieldImports,
    ZodTransformPipFirst,
    ZodTransformPipeAll,
    FormField,
    FormRoot,
    DebugPanelComponent,
    HlmIconImports,
    HlmAlertImports,
  ],
  providers: [
    provideIcons({ lucideCheck, lucideX, lucideMailX, lucideAlertCircle }),
  ],
  host: {
    class: 'contents',
  },
  templateUrl: './app.html',
})
export class AppComponent {
  private appService = inject(AppService);
  loginStatus = this.appService.loginResource;
  backendResponse = computed(() => {
    if (this.loginStatus.status() === 'error') {
      return (
        (this.loginStatus.error() as any)?.error ?? this.loginStatus.error()
      );
    }
    return this.loginStatus.value();
  });

  // Login form state management using Angular's reactive forms with signals
  loginData = signal({ email: '', password: '' });
  backendData = signal<any>(null);

  constructor() {
    effect(() => {
      this.loginData();

      // Whenever loginData changes, we reset the backend response to clear previous results
      //this clears the backend alert
      this.appService.reset();
    });
  }
  /**
   * Helper methods to fill the form with different test credentials for quick testing of various scenarios.
   */
  fillValidCredentials() {
    this.loginData.set(validLoginCredentials);
    this.loginForm().markAsDirty();
  }

  fillInvalidCredentials() {
    this.loginData.set(invalidLoginCredentials);
    this.loginForm().markAsDirty();
  }

  fillInvalidEmail() {
    this.loginData.set(invalidLoginCredentialsBadEmail);
    this.loginForm().markAsDirty();
  }

  /**
   * Signal based form that validates against the
   * LoginCredentialsSchema and triggers the login process on submission.
   */
  loginForm = form(
    this.loginData,
    (path) => {
      validateStandardSchema(path, LoginCredentialsSchema);
    },
    {
      submission: {
        action: async (data) => {
          this.appService.login(data().value());
        },
      },
    },
  );
}
