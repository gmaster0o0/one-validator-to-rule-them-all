# One Validator To Rule Them All

This monorepo is a validation-centric architecture sample built on Nx, Zod 4, Angular Signals, and NestJS. The goal is a single source of truth: one Zod schema drives both frontend and backend validation.

## Vision

The core idea is a schema-first workflow.

- **Zod Schema** is the single source of rules.
- No duplicated validation logic.
- No manually maintained DTOs.
- One schema controls both frontend form behavior and backend request validation.

### Key concepts

- **Zod Schema**: central contract for validation and type safety.
- **ErrorTransformer**: converts low-level Zod errors into user-friendly, translatable tokens (`{ path, key, param }`).
- **Signal Forms**: Angular v21+ reactive, type-safe form handling driven directly by the schema.
- **Spartan UI (Helm)**: custom Tailwind 4-based UI primitives owned by the project.

## Tech stack

- **Nx v21/v22**: modern monorepo management with Project Crystal foundations.
- **Angular v21.2+**: full Signal Forms and zoneless support.
- **Zod 4**: required schema definitions with a standard schema contract.
- **Tailwind 4**: CSS-first utility styling and fast build times.
- **NestJS v10+**: type-safe backend powered by Zod-based validation pipes.
- **Spartan UI**: accessible and customizable UI components.
- **Transloco**: runtime multilingual support (planned).

## Architecture

The repository is organized into apps and shared libraries under a monorepo structure.

- **apps/frontend**: Angular application using Signal Forms and schema-driven validation.
- **apps/backend**: NestJS server with Zod decorators and validation pipes.
- **shared/schema**: the heart of the system. Shared Zod schemas and DTO/contract definitions live here.
- **shared/validation**: home of `ErrorTransformer` and validation utilities.
- **shared/testing**: shared test utilities and helpers.
- **shared/spartan-ng**: Spartan UI primitives and Tailwind-based styling.

## Status

- **backend**: Login flow, Zod decorators, Zod pipes — ✅
- **frontend**: Signal form with Zod schema validation — ✅
- **shared/schemas**: ✅
- **shared/testing**: ✅
- **shared/validation**: `ErrorTransformer` — ✅
- **spartan-ng**: ✅

## Setup

Clone the repository and install dependencies:

```sh
git clone https://github.com/gmaster0o0/one-validator-to-rule-them-all.git
cd one-validator-to-rule-them-all
pnpm install
```

## Installation

This workspace uses `pnpm` and Nx.

- Install dependencies: `pnpm install`
- Show available projects and targets: `npx nx status`
- Generate the dependency graph: `npx nx graph`

## Running

### Backend

```sh
npx nx serve backend --configuration=development
```

### Frontend

```sh
npx nx serve frontend --configuration=development
```

### E2E tests

```sh
npx nx e2e backend-e2e
npx nx e2e frontend-e2e
```

## Test

### Unit tests

```sh
npx nx test <project-name>
```

Example:

```sh
npx nx test backend
npx nx test shared-validation
```

### End-to-end tests

```sh
npx nx e2e backend-e2e
npx nx e2e frontend-e2e
```

### Linting

```sh
npx nx lint <project-name>
```

## Notes

- Use `pnpm` throughout the workspace.
- Shared libraries are located under `shared/` instead of a traditional `libs/` folder.
- Frontend validation is schema-first and shares the same contract with the backend.

## Usage in templates

The `zodTransformAll` pipe transforms Zod errors into an array of tokens that can be used for translation. Each token has a `key` for the translation key and `params` for any dynamic values needed in the translation.

### More coding friendly but less extractor friendly. 

**extractor cannot understand the dynamic keys and params so it cannot extract the translation keys.**

```html
@if (loginForm.password().errors() | zodTransformAll:'login'; as tokens) { 
  @for (token of tokens; track $index) {
    <hlm-field-error>
      {{ token.key | transloco:token.params }}
    </hlm-field-error>
  } 
}
```

*You can add the missing keys to the language files manually or you can use the `marker` function in the ts.*
*This is still manual work but at least you don't need to worry about the dynamic keys and params in the templates, you can just add the keys in the ts and the extractor will pick them up.*
```ts
  _ = [
    marker('login.password.too_small'),
    marker('login.password.need_number'),
    marker('login.password.need_letter'),
  ];
```
### ❌ This solution is not working because it will shows all the error if any of the validator fails.

*It can work with a custom directive that shows the error only if the validator is failed, but it is not implemented yet.*


```html
@if (loginForm.password().errors() | zodTransformAll:'login'; as tokens) {
  <hlm-field-error validator="too_small">
    {{ 'login.password.too_small' | transloco: { minimum: 5 } }}
  </hlm-field-error>

  <hlm-field-error validator="need_number">
    {{ 'login.password.need_number' | transloco }}
  </hlm-field-error>

  <hlm-field-error validator="need_letter">
    {{ 'login.password.need_letter' | transloco }}
  </hlm-field-error>
}
```

### ✅ Show only the 1st error:

**this is partialy extract 1 key, but if there are more than 1 error, the extractor cannot understand the dynamic keys and params so it cannot extract the translation keys.**

```html
@if (loginForm.password().errors() | zodTransformFirst:'login'; as token) {
  <hlm-field-error>
    {{ token.key | transloco }}
  </hlm-field-error>
}
```

### Demo app preview:

<img width="974" height="870" alt="image" src="https://github.com/user-attachments/assets/90839731-85b8-438e-b2a7-8a886e65a565" />
