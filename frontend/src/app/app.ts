import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HlmCardImports,
    HlmLabelImports,
    HlmInputImports,
    HlmButtonImports,
    HlmFieldImports,
  ],
  providers: [provideIcons({ lucideCheck, lucideChevronDown })],
  host: {
    class: 'contents',
  },
  templateUrl: './app.html',
})
export class App {}
