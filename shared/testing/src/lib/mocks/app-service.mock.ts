/**
 * Framework agnostic mock of the AppService for testing purposes.
 * This mock is designed to be used in any testing framework, including Vitest.
 * It provides a simple structure to simulate the behavior of the AppService without relying on Angular specifics.
 */
export interface MockedAppService {
  status: 'idle' | 'loading' | 'error' | 'success';
  value: any;
  error: any;
  login: (data: any) => void;
}

export function createMockedAppService(): MockedAppService {
  return {
    status: 'idle',
    value: null,
    error: null,
    login: () => {
      // empty function, just a placeholder for the mock
    },
  };
}
