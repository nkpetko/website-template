import { Request, Response } from 'express';

/* This will be routed to example.com/v1/exampleControllerWithView */
export default {
	method: 'all',
	func: async (_req: Request, res: Response) => {
		res.render('Example', { Person: 'ExampleArgument' }); // Will render the Views/Example.html
	},
};
