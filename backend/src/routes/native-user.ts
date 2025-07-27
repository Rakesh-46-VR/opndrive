import { Request, Response, Router } from 'express';

const nativeUserRouter: Router = Router();

nativeUserRouter.get('/health', async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.log(`Server error : ${error}`);
    res
      .status(500)
      .json({ message: error instanceof Error ? error.message : 'Internal server error' });
  }
});

export default nativeUserRouter;
