import { Request, Response } from 'express';

export const Example404 = (_req: Request, res: Response) => {
	return res.send({ err: '404 not found' });
};
