# One Validator To Rule Them All

This monorepo is a validation-centric architecture sample built on Nx, Zod 4, Angular Signals, and NestJS. The goal is a single source of truth: one Zod schema drives both frontend and backend validation.

*This version of the code specialy made for the angular.love article:*
https://angular.love/one-validator-to-rule-them-all

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
- **Transloco**: runtime multilingual support (part2).

## Architecture

The repository is organized into apps and shared libraries under a monorepo structure.

- **apps/frontend**: Angular application using Signal Forms and schema-driven validation.
- **apps/backend**: NestJS server with Zod decorators and validation pipes.
- **shared/schema**: the heart of the system. Shared Zod schemas and DTO/contract definitions live here.
- **shared/validation**: home of `ErrorTransformer` and validation utilities.
- **shared/testing**: shared test utilities and helpers.
- **shared/spartan-ng**: Spartan UI primitives and Tailwind-based styling.

## Setup

Clone the repository and install dependencies:

```sh
git clone https://github.com/gmaster0o0/one-validator-to-rule-them-all.git
cd one-validator-to-rule-them-all
git checkout demo/part1 #if u not change u will get the latest version of the repo, not the demo for the article part 1
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

### Shortcuts

I made 3 short for verification:

```sh
pnpm run test

pnpm run lint

pnpm run typecheck


```

## Notes

- Use `pnpm` throughout the workspace.
- Shared libraries are located under `shared/` instead of a traditional `libs/` folder.
- Frontend validation is schema-first and shares the same contract with the backend.