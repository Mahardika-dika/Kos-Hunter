import { PublicRole } from '../enums/public-role.enums';

export function normalizePublicRole(value: unknown): PublicRole | undefined {
  if (typeof value !== 'string') return undefined;

  const normalized = value.trim().toUpperCase();

  const roles = Object.values(PublicRole) as string[];

  if (roles.includes(normalized)) {
    return normalized as PublicRole;
  }

  return undefined;
}
