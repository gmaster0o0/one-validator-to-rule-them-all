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
import { LanguageSelector } from './languange/language-selector';
import { TranslocoModule } from '@jsverse/transloco';
import { hlmH1 } from '@spartan-ng/helm/typography';
import { marker } from '@jsverse/transloco-keys-manager/marker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LanguageSelector,
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
    TranslocoModule,
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
  protected readonly h1Class = hlmH1;

  loginStatus = this.appService.status;
  // Derives the value shown in the debug panel and the error alert from plain signals —
  // no constructor effect needed.
  backendResponse = computed(() =>
    this.appService.status() === 'error'
      ? this.appService.error()
      : this.appService.value(),
  );

  errorResponse = computed(() =>
    this.appService.status() === 'error' ? this.appService.error() : null,
  );

  // Login form state management using Angular's reactive forms with signals
  loginData = signal({ email: '', password: '' });

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
