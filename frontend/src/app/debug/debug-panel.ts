import { Component, input, type Signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideHourglass, lucideX } from '@ng-icons/lucide';
import { TranslocoModule } from '@jsverse/transloco';

/**
 * Minimal structural view of a Signal Forms field state — only the state
 * signals the debug template actually reads. Keeps the panel reusable for any
 * form shape without depending on the model type (and without `any`).
 */
interface DebugFormState {
  valid: Signal<boolean>;
  invalid: Signal<boolean>;
  pending: Signal<boolean>;
  dirty: Signal<boolean>;
  touched: Signal<boolean>;
  errorSummary: Signal<unknown[]>;
}

@Component({
  selector: 'app-debug-panel',
  standalone: true,
  imports: [JsonPipe, HlmCardImports, HlmIconImports, TranslocoModule],
  providers: [provideIcons({ lucideCheck, lucideHourglass, lucideX })],
  templateUrl: `./debug-panel.html`,
})
export class DebugPanelComponent {
  data = input.required<unknown>();
  form = input.required<DebugFormState>();
  backendResponse = input<unknown>();
  backendStatus = input<string>();
}
