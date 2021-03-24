import { Request, Response } from 'express';

/* This will be routed to example.com/v1/exampleController */
export default {
	method: 'all',
	func: async (_req: Request, res: Response) => {
		res.send({ message: 'OK' });
	},
};
