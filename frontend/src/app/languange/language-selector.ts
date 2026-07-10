import { Component, computed, inject } from '@angular/core';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { provideIcons } from '@ng-icons/core';
import { lucideGlobe } from '@ng-icons/lucide';
import { LanguageService } from './language.service';
import { TranslocoModule } from '@jsverse/transloco';
import { HlmSelectImports } from '@spartan-ng/helm/select';

interface LangOption {
  readonly value: string;
  readonly label: string;
}

@Component({
  selector: 'app-language',
  imports: [HlmIconImports, HlmSelectImports, TranslocoModule],
  templateUrl: './language-selector.html',
  providers: [provideIcons({ lucideGlobe })],
})
export class LanguageSelector {
  languageService = inject(LanguageService);
  formId = 'language-form';

  protected readonly languageOptions: readonly LangOption[] = [
    { value: 'en', label: 'English/EN' },
    { value: 'hu', label: 'Magyar/HU' },
    { value: 'pl', label: 'Polski/PL' },
    { value: 'es', label: 'Español/ES' },
  ] as const;

  protected readonly currentLangValue = computed(() =>
    this.languageOptions.find(
      (opt) => opt.value === this.languageService.currentLang(),
    ),
  );

  handleLangChange(newLang: LangOption | null | undefined) {
    if (newLang) {
      this.languageService.setLanguage(newLang.value);
    }
  }
}
