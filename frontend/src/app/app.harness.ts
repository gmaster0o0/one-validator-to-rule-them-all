import { ComponentHarness } from '@angular/cdk/testing';

export class LoginFormHarness extends ComponentHarness {
  // Target the component card on the main branch
  static hostSelector = 'section[hlmCard]';

  protected getTitleElement = this.locatorFor('h3[hlmCardTitle]');
  protected getEmailInput = this.locatorFor('input#email');
  protected getPasswordInput = this.locatorFor('input#password');
  protected getForm = this.locatorFor('form#loginFormId');
  protected getErrors = this.locatorForAll('hlm-field-error');
  protected getAlertDescription = this.locatorForOptional(
    'p[hlmAlertDescription]',
  );

  async getTitle(): Promise<string> {
    const title = await this.getTitleElement();
    return title.text();
  }

  async fillForm(email: string, password: string): Promise<void> {
    const emailInput = await this.getEmailInput();
    const passwordInput = await this.getPasswordInput();

    await emailInput.setInputValue(email);
    await passwordInput.setInputValue(password);

    await emailInput.dispatchEvent('input');
    await passwordInput.dispatchEvent('input');
    await emailInput.dispatchEvent('blur');
    await passwordInput.dispatchEvent('blur');
  }

  async submit(): Promise<void> {
    const form = await this.getForm();

    await form.dispatchEvent('submit');
  }

  async getErrorMessages(): Promise<string[]> {
    const errors = await this.getErrors();
    return Promise.all(errors.map((el) => el.text()));
  }

  async getBackendErrorMessage(): Promise<string | null> {
    const alertDesc = await this.getAlertDescription();
    if (!alertDesc) {
      return null;
    }
    return alertDesc.text();
  }
}
