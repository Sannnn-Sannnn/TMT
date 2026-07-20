import { describe, it, expect, vi, beforeEach } from 'vitest';
import { taskService } from './task.service.js';
import { prisma } from '../../config/prisma.js';

vi.mock('../../config/prisma.js', () => ({
  prisma: {
    task: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('taskService.create', () => {
  it('should create a task with the given userId and data', async () => {
    const fakeTask = { id: 1, description: 'Buy milk', period: 'week', userId: 5 };
    vi.mocked(prisma.task.create).mockResolvedValue(fakeTask as any);

    const result = await taskService.create(5, { description: 'Buy milk', period: 'week' });

    expect(prisma.task.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fakeTask);
  });

  it("should include a dueFor date in the created task's data", async () => {
    vi.mocked(prisma.task.create).mockResolvedValue({} as any);

    await taskService.create(5, { description: 'Buy milk', period: 'today' });

    const callArgs = vi.mocked(prisma.task.create).mock.calls[0][0] as any;
    expect(callArgs.data.dueFor).toBeInstanceOf(Date);
  });

  it("should set dueFor to roughly one day ahead for the 'today' period", async () => {
    vi.mocked(prisma.task.create).mockResolvedValue({} as any);

    await taskService.create(5, { description: 'Buy milk', period: 'today' });

    const callArgs = vi.mocked(prisma.task.create).mock.calls[0][0] as any;
    const dueFor = callArgs.data.dueFor as Date;
    const diffHours = (dueFor.getTime() - Date.now()) / (1000 * 60 * 60);

    expect(diffHours).toBeGreaterThan(23);
    expect(diffHours).toBeLessThan(25);
  });

  it('should pass the userId along with the rest of the task data', async () => {
    vi.mocked(prisma.task.create).mockResolvedValue({} as any);

    await taskService.create(5, { description: 'Buy milk', period: 'month' });

    const callArgs = vi.mocked(prisma.task.create).mock.calls[0][0] as any;
    expect(callArgs.data.userId).toBe(5);
    expect(callArgs.data.description).toBe('Buy milk');
  });
});

describe('taskService.get', () => {
  it('should call findUnique with the given task id', async () => {
    vi.mocked(prisma.task.findUnique).mockResolvedValue(null);

    await taskService.get(10);

    expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id: 10 } });
  });
});

describe('taskService.getAll', () => {
  it('should call findMany scoped to the given userId', async () => {
    vi.mocked(prisma.task.findMany).mockResolvedValue([]);

    await taskService.getAll(5);

    expect(prisma.task.findMany).toHaveBeenCalledWith({ where: { userId: 5 } });
  });
});

describe('taskService.update', () => {
  it('should call update with the given task id and data', async () => {
    vi.mocked(prisma.task.update).mockResolvedValue({} as any);

    await taskService.update(10, { done: true });

    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: 10 },
      data: { done: true },
    });
  });
});

describe('taskService.delete', () => {
  it('should call delete with the given task id', async () => {
    vi.mocked(prisma.task.delete).mockResolvedValue({} as any);

    await taskService.delete(10);

    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 10 } });
  });
});
