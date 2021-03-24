import { ConfigOpts } from '../SDK/Startup';
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { _baseDirName } from './Directories';
import config from '../Config/MetaData';

export default (
	app: IApplicationBuilder,
	PagesDir: string,
	EndpointsDir: string,
	apiName: string,
	errorpage?: boolean,
	fileListings?: boolean,
) => {
	return {
		app: app,
		...((config as unknown) as ConfigOpts),
		PagesOpts: {
			path: _baseDirName + PagesDir,
		},
		EndpointOpts: {
			path: _baseDirName + EndpointsDir,
			logSetups: true,
			apiName: apiName,
		},
		errorpage: errorpage,
		fileListings,
	};
};
