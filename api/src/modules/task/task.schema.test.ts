import { describe, it, expect } from 'vitest';
import { createTaskSchema, updateTaskSchema } from './task.schema.js';

describe('createTaskSchema', () => {
  it('should accept a valid task input', () => {
    const result = createTaskSchema.safeParse({
      description: 'Buy groceries',
      period: 'week',
    });
    expect(result.success).toBe(true);
  });

  it('should reject an empty description', () => {
    const result = createTaskSchema.safeParse({
      description: '',
      period: 'week',
    });
    expect(result.success).toBe(false);
  });

  it('should reject a missing description', () => {
    const result = createTaskSchema.safeParse({ period: 'week' });
    expect(result.success).toBe(false);
  });

  it('should reject an invalid period value', () => {
    const result = createTaskSchema.safeParse({
      description: 'Buy groceries',
      period: 'year',
    });
    expect(result.success).toBe(false);
  });

  it('should reject a missing period', () => {
    const result = createTaskSchema.safeParse({ description: 'Buy groceries' });
    expect(result.success).toBe(false);
  });

  it.each(['today', 'week', 'month'])("should accept '%s' as a valid period", (period) => {
    const result = createTaskSchema.safeParse({ description: 'Task', period });
    expect(result.success).toBe(true);
  });
});

describe('updateTaskSchema', () => {
  it('should accept an empty object since all fields are optional', () => {
    const result = updateTaskSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('should accept a partial update with only description', () => {
    const result = updateTaskSchema.safeParse({ description: 'New description' });
    expect(result.success).toBe(true);
  });

  it('should accept a partial update with only done', () => {
    const result = updateTaskSchema.safeParse({ done: true });
    expect(result.success).toBe(true);
  });

  it('should reject a non-boolean done value', () => {
    const result = updateTaskSchema.safeParse({ done: 'yes' });
    expect(result.success).toBe(false);
  });

  it('should reject a non-string description', () => {
    const result = updateTaskSchema.safeParse({ description: 123 });
    expect(result.success).toBe(false);
  });
});
