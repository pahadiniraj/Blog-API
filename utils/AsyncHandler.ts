import { Request, Response, NextFunction } from 'express';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler = (fn: AsyncHandler) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status((error as { status: number }).status || 500).json({
      success: false,
      message: (error as Error).message || "Server Error",
    });
    console.log(error);
  }
};

export { asyncHandler };
