import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from './user.service.js';
import { prisma } from '../../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

vi.mock('../../config/prisma.js', () => ({
  prisma: {
    user: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
    verify: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('userService.create', () => {
  it('should hash the password before storing the user', async () => {
    vi.mocked(bcrypt.hash).mockResolvedValue('hashed-pw' as never);
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: 1,
      email: 'a@a.com',
      password: 'hashed-pw',
    } as any);
    vi.mocked(jwt.sign).mockReturnValue('fake-token' as never);

    await userService.create({ email: 'a@a.com', password: 'plain-pw' });

    expect(bcrypt.hash).toHaveBeenCalledWith('plain-pw', 12);
    const createArgs = vi.mocked(prisma.user.create).mock.calls[0][0] as any;
    expect(createArgs.data.password).toBe('hashed-pw');
  });

  it('should return the created user without the password field', async () => {
    vi.mocked(bcrypt.hash).mockResolvedValue('hashed-pw' as never);
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: 1,
      email: 'a@a.com',
      password: 'hashed-pw',
    } as any);
    vi.mocked(jwt.sign).mockReturnValue('fake-token' as never);

    const result = await userService.create({ email: 'a@a.com', password: 'plain-pw' });

    expect(result.user).not.toHaveProperty('password');
    expect(result.user).toEqual({ id: 1, email: 'a@a.com' });
  });

  it('should return a signed token for the new user', async () => {
    process.env.JWT_SECRET = 'test-secret';
    vi.mocked(bcrypt.hash).mockResolvedValue('hashed-pw' as never);
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: 1,
      email: 'a@a.com',
      password: 'hashed-pw',
    } as any);
    vi.mocked(jwt.sign).mockReturnValue('fake-token' as never);

    const result = await userService.create({ email: 'a@a.com', password: 'plain-pw' });

    expect(jwt.sign).toHaveBeenCalledWith({ id: 1 }, expect.anything(), { expiresIn: '30d' });
    expect(result.token).toBe('fake-token');
  });
});

describe('userService.login', () => {
  it('should return the user and a token with valid credentials', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 1,
      email: 'a@a.com',
      password: 'hashed-pw',
    } as any);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
    vi.mocked(jwt.sign).mockReturnValue('fake-token' as never);

    const result = await userService.login({ email: 'a@a.com', password: 'plain-pw' });

    expect(result.user).toEqual({ id: 1, email: 'a@a.com' });
    expect(result.token).toBe('fake-token');
  });

  it('should throw if the email does not exist', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

    await expect(userService.login({ email: 'nope@a.com', password: 'plain-pw' })).rejects.toThrow(
      'Invalid email or password',
    );
  });

  it('should throw if the password does not match', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 1,
      email: 'a@a.com',
      password: 'hashed-pw',
    } as any);
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

    await expect(userService.login({ email: 'a@a.com', password: 'wrong-pw' })).rejects.toThrow(
      'Invalid email or password',
    );
  });
});

describe('userService.logout', () => {
  it('should blacklist the token so a later findByToken call rejects it', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 1,
      email: 'a@a.com',
      password: 'hashed-pw',
    } as any);

    await userService.logout('token-to-blacklist');

    await expect(userService.findByToken('token-to-blacklist', 1)).rejects.toThrow('Invalid user');
  });
});

describe('userService.findByToken', () => {
  it('should return the user without the password field', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 2,
      email: 'b@b.com',
      password: 'hashed-pw',
    } as any);

    const result = await userService.findByToken('some-other-token', 2);

    expect(result).toEqual({ id: 2, email: 'b@b.com' });
  });

  it('should throw if the user does not exist', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

    await expect(userService.findByToken('any-token', 999)).rejects.toThrow('Invalid user');
  });
});
