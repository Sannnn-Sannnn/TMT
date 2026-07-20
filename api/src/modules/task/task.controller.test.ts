import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import { taskController } from "./task.controller.js";
import { taskService } from "./task.service.js";

vi.mock("./task.service.js", () => ({
    taskService: {
        create: vi.fn(),
        get: vi.fn(),
        getAll: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
}));

function buildRes(): Response {
    return {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as Response;
}

const next = vi.fn() as NextFunction;

beforeEach(() => {
    vi.clearAllMocks();
});

describe("taskController.create", () => {
    it("should respond with 201 and the created task", async () => {
        const req = { userId: 1, body: { description: "Task", period: "week" } } as Request;
        const res = buildRes();
        vi.mocked(taskService.create).mockResolvedValue({ id: 1 } as any);

        await taskController.create(req, res, next);

        expect(taskService.create).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });

    it("should call next with the error if the service throws", async () => {
        const req = { userId: 1, body: {} } as Request;
        const res = buildRes();
        const error = new Error("boom");
        vi.mocked(taskService.create).mockRejectedValue(error);

        await taskController.create(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});

describe("taskController.findAll", () => {
    it("should respond with 200 and the user's tasks", async () => {
        const req = { userId: 1 } as Request;
        const res = buildRes();
        vi.mocked(taskService.getAll).mockResolvedValue([{ id: 1 }] as any);

        await taskController.findAll(req, res, next);

        expect(taskService.getAll).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
    });
});

describe("taskController.update", () => {
    it("should respond with 404 if the task does not exist", async () => {
        const req = { userId: 1, params: { taskId: "5" }, body: {} } as unknown as Request;
        const res = buildRes();
        vi.mocked(taskService.get).mockResolvedValue(null);

        await taskController.update(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(taskService.update).not.toHaveBeenCalled();
    });

    it("should respond with 401 if the task belongs to another user", async () => {
        const req = { userId: 1, params: { taskId: "5" }, body: {} } as unknown as Request;
        const res = buildRes();
        vi.mocked(taskService.get).mockResolvedValue({ id: 5, userId: 2 } as any);

        await taskController.update(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(taskService.update).not.toHaveBeenCalled();
    });

    it("should update and respond with 200 when the task belongs to the user", async () => {
        const req = {
            userId: 1,
            params: { taskId: "5" },
            body: { done: true },
        } as unknown as Request;
        const res = buildRes();
        vi.mocked(taskService.get).mockResolvedValue({ id: 5, userId: 1 } as any);
        vi.mocked(taskService.update).mockResolvedValue({ id: 5, done: true } as any);

        await taskController.update(req, res, next);

        expect(taskService.update).toHaveBeenCalledWith(5, { done: true });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 5, done: true });
    });
});

describe("taskController.delete", () => {
    it("should respond with 404 if the task does not exist", async () => {
        const req = { userId: 1, params: { taskId: "5" } } as unknown as Request;
        const res = buildRes();
        vi.mocked(taskService.get).mockResolvedValue(null);

        await taskController.delete(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(taskService.delete).not.toHaveBeenCalled();
    });

    it("should respond with 401 if the task belongs to another user", async () => {
        const req = { userId: 1, params: { taskId: "5" } } as unknown as Request;
        const res = buildRes();
        vi.mocked(taskService.get).mockResolvedValue({ id: 5, userId: 2 } as any);

        await taskController.delete(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(taskService.delete).not.toHaveBeenCalled();
    });

    it("should delete and respond with 200 when the task belongs to the user", async () => {
        const req = { userId: 1, params: { taskId: "5" } } as unknown as Request;
        const res = buildRes();
        vi.mocked(taskService.get).mockResolvedValue({ id: 5, userId: 1 } as any);
        vi.mocked(taskService.delete).mockResolvedValue({ id: 5 } as any);

        await taskController.delete(req, res, next);

        expect(taskService.delete).toHaveBeenCalledWith(5);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ id: 5 });
    });
});