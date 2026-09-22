// Reusable input-validation helpers for route handlers.
// Each function throws HttpError(400) on invalid input.
// Imported by route files (auth.js, products.js, cart.js, orders.js).

import { HttpError } from './HttpError.js';

export function requireString(value, name, maxLen) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new HttpError(400, `${name} is required`);
  }
  if (maxLen && value.trim().length > maxLen) {
    throw new HttpError(400, `${name} must be at most ${maxLen} characters`);
  }
  return value.trim();
}

export function optionalString(value, name, maxLen) {
  if (value === undefined || value === null || value === '') {
    return '';
  }
  if (typeof value !== 'string') {
    throw new HttpError(400, `${name} must be a string`);
  }
  if (maxLen && value.trim().length > maxLen) {
    throw new HttpError(400, `${name} must be at most ${maxLen} characters`);
  }
  return value.trim();
}

export function requirePositiveInt(value, name) {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) {
    throw new HttpError(400, `${name} must be a positive integer`);
  }
  return n;
}

export function requireNonNegativeInt(value, name) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0) {
    throw new HttpError(400, `${name} must be a non-negative integer`);
  }
  return n;
}

export function requireIntRange(value, name, min, max) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max) {
    throw new HttpError(400, `${name} must be an integer between ${min} and ${max}`);
  }
  return n;
}

export function requireEmail(value) {
  if (typeof value !== 'string') {
    throw new HttpError(400, 'email is required');
  }
  const email = value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(400, 'Invalid email format');
  }
  return email;
}
