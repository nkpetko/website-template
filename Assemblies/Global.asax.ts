/*
	FileName: Roblox.Global.asax.ts
	Written By: Nikita Nikolaevich Petko,
	Description: Copy of ROBLOX's Roblox.Global.asax.cs
*/

import IServer from 'express';
import { Example404 } from './ErrorResponders/Example404Responder';
import { ExampleMiddleware } from './MiddleWare/ExampleMiddleware';
import { Startup } from './SDK/Startup';
import { _baseDirName } from './Util/Directories';
import { DFLog, DYNAMIC_LOGVARIABLE, FASTLOG2, FASTLOGS, SYNCHRONIZED_LOGVARIABLE } from './Util/FastLog';
import MetaData from './Util/MetaData';
import { Starter } from './Util/Starter';
import { URLS } from './Util/Urls';

// Define all SFLogs here.
SYNCHRONIZED_LOGVARIABLE(URLS['EXAMPLE'], 6); // Set these to level 6 so they won't log to server.log

DYNAMIC_LOGVARIABLE('Tasks', 7); // This loggroup should be 7+ by default.

(async () => {
	try {
		const EXAMPLE_SERVER = IServer();

		// This middleware will be called before the controller/page is loaded, do authentication here. etc
		EXAMPLE_SERVER.use(ExampleMiddleware);

		// This configures a view engine to be used via response.render(viewName, args);
		EXAMPLE_SERVER.engine('html', require('ejs').renderFile);
		EXAMPLE_SERVER.set('views', _baseDirName + '\\Views');
		EXAMPLE_SERVER.set('view engine', 'html');

		await Startup.Configure(
			MetaData(
				EXAMPLE_SERVER, // The app
				'\\StaticPages\\ExampleStaticPages', // This will be the directory where your static content is served.
				'\\Assemblies\\Bin\\Controllers\\ExampleControllers', // This will be the directory in your ts output dir where you define controllers.
				URLS['EXAMPLE'], // The url to use.
			),
		);

		// This middleware will be called when the page cannot be found, use this to display some view etc.
		EXAMPLE_SERVER.use(Example404);

		await (async () => {
			try {
				Starter(EXAMPLE_SERVER, URLS['EXAMPLE'], false); // Sets up a server that uses EXAMPLE_SERVER, Without HTTPS
			} catch (e) {
				return FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Error: %s, Stack Trace: %s`, e.message, e.stack);
			}
		})();
	} catch (e) {
		return FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Error: %s, Stack Trace: %s`, e.message, e.stack);
	}
})();

process.stdin.resume();
function exitHandler(options: { exit: boolean; error: boolean; message?: string; code?: number }) {
	if (options.exit) {
		if (options.error) FASTLOGS(DFLog('Tasks'), `[DFLog::Tasks] %s`, options.message);
		if (options.message) FASTLOGS(DFLog('Tasks'), `[DFLog::Tasks] %s`, options.message);
		process.exit();
	}
}
process.on('SIGINT', exitHandler.bind(null, { exit: true, message: 'SIGINT on server' }));
process.on('SIGUSR1', exitHandler.bind(null, { exit: true, message: 'SIGUSR1 on server' }));
process.on('beforeExit', exitHandler.bind(null, { exit: true, message: 'Exit Services' }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true, message: 'SIGUSR2 on server' }));
process.on('uncaughtException', (e) => {
	exitHandler({ exit: true, error: true, message: `Name: ${e.name}, Reason: ${e.message}, Stack Trace: ${e.stack}` });
});
