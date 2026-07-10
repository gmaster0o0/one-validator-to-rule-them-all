import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AppComponent } from './app';
import { getTranslocoModule } from './languange/transloco-testing.module';
import { AppService } from './app.service';
import { LoginFormHarness } from './app.harness';
import { signal } from '@angular/core';
import { vi } from 'vitest';
import {
  createMockedAppService,
  invalidLoginCredentials,
  validLoginCredentials,
} from '@one-validator-to-rule-them-all/testing';

describe('AppComponent', () => {
  let angularSignals: {
    status: ReturnType<typeof signal<'idle' | 'loading' | 'error' | 'success'>>;
    value: ReturnType<typeof signal<any>>;
    error: ReturnType<typeof signal<any>>;
  };
  let mockAppService: any;

  beforeEach(async () => {
    const agnosticMock = createMockedAppService();

    angularSignals = {
      status: signal(agnosticMock.status),
      value: signal(agnosticMock.value),
      error: signal(agnosticMock.error),
    };

    mockAppService = {
      status: angularSignals.status,
      value: angularSignals.value,
      error: angularSignals.error,
      login: vi.fn(agnosticMock.login),
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
    expect(await formHarness.getTitle()).toBeDefined();
  });

  it('should display validation errors when fields are empty/invalid', async () => {
    const { formHarness } = await setup();
    await formHarness.fillForm('', '');
    const errors = await formHarness.getErrorMessages();
    // Check that validation errors are displayed
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should call AppService.login when valid credentials are submitted', async () => {
    const { formHarness } = await setup();

    await formHarness.fillForm(
      validLoginCredentials.email,
      validLoginCredentials.password,
    );
    await formHarness.submit();

    expect(mockAppService.login).toHaveBeenCalledWith(validLoginCredentials);
  });

  it('should display the backend error message when login fails', async () => {
    const { formHarness } = await setup();
    // Ensure that the backend not displaying an error message at the start of the test
    expect(await formHarness.getBackendErrorMessage()).toBeNull();

    // Simulate a failed login by mocking the AppService.login method to set the error signal
    mockAppService.login.mockImplementationOnce(() => {
      angularSignals.status.set('error');
      angularSignals.error.set({ message: 'Invalid credentials provided.' });
    });

    // Perform the action
    await formHarness.fillForm(
      invalidLoginCredentials.email,
      invalidLoginCredentials.password,
    );
    await formHarness.submit();

    // Check that the service was called with the invalid credentials
    expect(mockAppService.login).toHaveBeenCalledWith(invalidLoginCredentials);

    // Check that the error message is displayed in the DOM
    // alert component should display the error message from the AppService
    const backendError = await formHarness.getBackendErrorMessage();
    expect(backendError).toBe('Invalid credentials provided.');
  });

  /** This test combines two behaviors:
   * 1. It checks when the credentials are valid, the login successfully there will be no error message displayed in the UI.
   * 2. It verifies that any previous error messages are cleared when a successful login occurs.
   */
  it('should call AppService.login when valid credentials are submitted and clear previous errors', async () => {
    const { formHarness } = await setup();

    // 0. Prerequisite: Simulate a previous error state in the AppService
    angularSignals.status.set('error');
    angularSignals.error.set({ message: 'Previous bad password attempt' });

    // Check that the harness sees the error at the beginning of the test
    expect(await formHarness.getBackendErrorMessage()).toBe(
      'Previous bad password attempt',
    );

    // 2. MOCK BEHAVIOR: Simulate that a successful login call switches to loading/success and CLEARS the error
    mockAppService.login.mockImplementationOnce(() => {
      angularSignals.status.set('loading'); // or 'success', depending on the backend implementation
      angularSignals.error.set(null); // <--- The error is cleared!
    });

    // 3. ACTION: Fill in the form with valid data and submit
    await formHarness.fillForm(
      validLoginCredentials.email,
      validLoginCredentials.password,
    );
    await formHarness.submit();

    // 4. ASSERTIONS:
    // Check that the service was called with the valid credentials
    expect(mockAppService.login).toHaveBeenCalledWith(validLoginCredentials);

    // Check that the error message is cleared from the UI
    const backendError = await formHarness.getBackendErrorMessage();
    expect(backendError).toBeNull();
  });
});
