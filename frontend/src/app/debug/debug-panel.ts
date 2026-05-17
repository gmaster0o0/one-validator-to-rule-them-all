import { Component, input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideHourglass, lucideX } from '@ng-icons/lucide';

@Component({
  selector: 'app-debug-panel',
  standalone: true,
  imports: [JsonPipe, HlmCardImports, HlmIconImports],
  providers: [provideIcons({ lucideCheck, lucideHourglass, lucideX })],
  templateUrl: `./debug-panel.html`,
})
export class DebugPanelComponent {
  data = input.required<any>();
  form = input.required<any>();
  backendResponse = input<any>();
  backendStatus = input<any>();
}
