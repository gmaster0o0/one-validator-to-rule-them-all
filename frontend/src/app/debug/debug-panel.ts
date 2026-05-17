import { Component, input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-debug-panel',
  standalone: true,
  imports: [JsonPipe, HlmCardImports],
  templateUrl: `./debug-panel.html`,
})
export class DebugPanelComponent {
  data = input.required<any>();
  form = input.required<any>();
}
