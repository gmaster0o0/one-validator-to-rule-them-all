import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentHarness } from '@angular/cdk/testing';
import { AppComponent } from './app';
import { getTranslocoModule } from './languange/transloco-testing.module';
import { AppService } from './app.service';
import { signal } from '@angular/core';
import { vi } from 'vitest';

class LoginFormHarness extends ComponentHarness {
  static hostSelector = 'section[hlmCard]';

  protected getTitleElement = this.locatorFor('h3[hlmCardTitle]');
  protected getEmailInput = this.locatorFor('input[type="email"]');
  protected getPasswordInput = this.locatorFor('input[type="password"]');
  protected getSubmitButton = this.locatorFor('button[type="submit"]');
  protected getErrors = this.locatorForAll('hlm-field-error');
  protected getForm = this.locatorFor('form');

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
}

describe('AppComponent', () => {
  let mockAppService: any;

  beforeEach(async () => {
    mockAppService = {
      status: signal('idle'),
      value: signal(null),
      error: signal(null),
      login: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent, getTranslocoModule()],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compileComponents();
  });

  async function setup() {
    const fixture = TestBed.createComponent(AppComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const formHarness =
      await loader.getHarness<LoginFormHarness>(LoginFormHarness);
    return { fixture, formHarness };
  }

  it('should render the login card with the correct title', async () => {
    const { formHarness } = await setup();
    expect(await formHarness.getTitle()).toBe('Login');
  });

  it('should display validation errors when fields are empty/invalid', async () => {
    const { formHarness } = await setup();
    const errors = await formHarness.getErrorMessages();
    expect(errors).toContain('Invalid email address');
  });

  it('should call AppService.login when valid credentials are submitted', async () => {
    const { formHarness } = await setup();

    await formHarness.fillForm('test@example.com', 'SuperSecurePassword123');
    await formHarness.submit();

    expect(mockAppService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'SuperSecurePassword123',
    });
  });
});
