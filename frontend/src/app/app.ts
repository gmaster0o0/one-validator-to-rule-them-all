import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { Component, signal } from '@angular/core';
import {
  form,
  FormRoot,
  FormField,
  validateStandardSchema,
} from '@angular/forms/signals';
import { LoginCredentialsSchema } from '@one-validator-to-rule-them-all/shared/schema';
import { DebugPanelComponent } from './debug/debug-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HlmCardImports,
    HlmLabelImports,
    HlmInputImports,
    HlmButtonImports,
    HlmFieldImports,
    FormField,
    FormRoot,
    DebugPanelComponent,
  ],
  providers: [provideIcons({ lucideCheck, lucideChevronDown })],
  host: {
    class: 'contents',
  },
  templateUrl: './app.html',
})
export class AppComponent {
  loginData = signal({ email: '', password: '' });

  loginForm = form(
    this.loginData,
    (path) => validateStandardSchema(path, LoginCredentialsSchema),
    {
      submission: {
        action: async (data) => {
          console.log('Valid datas:', data);
        },
      },
    },
  );
}
