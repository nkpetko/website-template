import { RequestHandler } from 'express-serve-static-core';

export const ExampleMiddleware = ((_req, res, next) => {
	res.header('Example', 'Value');
	next();
}) as RequestHandler;
