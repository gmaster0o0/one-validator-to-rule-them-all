import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { getTranslocoModule } from './languange/transloco-testing.module';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, getTranslocoModule()],
    }).compileComponents();
  });

  it('should render the login form', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Login to your account');
  });
});
