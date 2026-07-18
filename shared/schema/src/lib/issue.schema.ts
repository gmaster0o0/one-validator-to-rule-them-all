import { z } from 'zod';

/**
 * "Loose" issue shape for non-Zod errors (e.g., backend responses).
 * This is actually validated, not just trusted as a type — if someone tries to
 * run an object through it that doesn't even remotely resemble an issue,
 * .parse() will throw an error instead of silently passing through.
 */
export const LooseIssueSchema = z.looseObject({
  code: z.string().optional(),
  errorCode: z.string().optional(),
  path: z.array(z.union([z.string(), z.number(), z.symbol()])).optional(),
  message: z.string().optional(),
});
export type LooseIssue = z.infer<typeof LooseIssueSchema>;

/**
 * "IssueLike" represents either a minimal Zod issue with our custom errorCode
 * or a loose, validated non-Zod error.
 * The $ZodIssueBase interface from Zod provides the guaranteed contract for real Zod issues
 */
export type IssueLike =
  | (z.core.$ZodIssueBase & { errorCode?: string })
  | LooseIssue;
