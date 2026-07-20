import { describe, it, expect } from 'vitest';
import { createUserSchema, loginSchema } from './user.schema.js';

describe('createUserSchema', () => {
  it('should accept a valid email and password', () => {
    const result = createUserSchema.safeParse({ email: 'a@a.com', password: '12345678' });
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const result = createUserSchema.safeParse({ email: 'not-an-email', password: '12345678' });
    expect(result.success).toBe(false);
  });

  it('should reject a password shorter than 8 characters', () => {
    const result = createUserSchema.safeParse({ email: 'a@a.com', password: '1234567' });
    expect(result.success).toBe(false);
  });

  it('should reject a missing email', () => {
    const result = createUserSchema.safeParse({ password: '12345678' });
    expect(result.success).toBe(false);
  });

  it('should reject a missing password', () => {
    const result = createUserSchema.safeParse({ email: 'a@a.com' });
    expect(result.success).toBe(false);
  });
});

describe('loginSchema', () => {
  it('should accept a valid email and a non-empty password', () => {
    const result = loginSchema.safeParse({ email: 'a@a.com', password: 'x' });
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const result = loginSchema.safeParse({ email: 'not-an-email', password: 'x' });
    expect(result.success).toBe(false);
  });

  it('should reject a missing password', () => {
    const result = loginSchema.safeParse({ email: 'a@a.com' });
    expect(result.success).toBe(false);
  });

  it('should reject a missing email', () => {
    const result = loginSchema.safeParse({ password: 'x' });
    expect(result.success).toBe(false);
  });
});
