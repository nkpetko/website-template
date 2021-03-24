import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { json as jparser } from 'express';
import bparser from 'body-parser';
import { OutgoingMessage } from 'http';
import cparser from 'cookie-parser';
import DeveloperExceptionPage from '../GlobalHelpers/DeveloperExceptionPage';
import UseRouting from '../GlobalHelpers/UseRouting';
import MapControllers from '../GlobalHelpers/MapControllers';
import UsePages from '../GlobalHelpers/UsePages';
import { DFLog, DYNAMIC_LOGGROUP, FASTLOG2 } from '../Util/FastLog';

export interface ConfigOpts<R extends OutgoingMessage = OutgoingMessage> {
	app: IApplicationBuilder;

	UseEndpoints?: boolean;
	UseRouting?: boolean;
	RoutingOpts?: {
		caseSensitive?: boolean;
		mergeParams?: boolean;
		strict?: boolean;
	};
	EndpointOpts?: {
		path: string;
		logSetups?: boolean;
		apiName?: string;
	};
	PagesOpts?: {
		path: string;
	};
	UsePages?: boolean;
	PageOpts?: {
		cacheControl?: boolean;
		dotfiles?: string;
		etag?: boolean;
		extensions?: string[] | false;
		fallthrough?: boolean;
		immutable?: boolean;
		index?: boolean | string | string[];
		lastModified?: boolean;
		maxAge?: number | string;
		redirect?: boolean;
		setHeaders?: (res: R, path: string, stat: unknown) => unknown;
	};
	errorpage?: boolean;
}

DYNAMIC_LOGGROUP('Tasks');
export namespace Startup {
	export const Configure = async (opts: ConfigOpts): Promise<void> => {
		try {
			opts.app.disable('etag');
			opts.app.disable('case sensitive routing');
			opts.app.enable('trust proxy');
			opts.app.disable('x-powered-by');
			opts.app.disable('strict routing');
			opts.app.use(cparser(), jparser(), bparser.urlencoded({ extended: false }));
			if (opts.UsePages) {
				await UsePages(opts.app, opts.PagesOpts, opts.PageOpts);
			}
			if (opts.UseRouting) {
				await UseRouting(opts.app, opts.RoutingOpts);
			}
			if (opts.UseEndpoints) {
				await MapControllers(opts.app, opts.EndpointOpts);
			}
			if (opts.errorpage) {
				await DeveloperExceptionPage(opts.app);
			}
		} catch (e) {
			FASTLOG2(DFLog('Tasks'), `[DFLog::Tasks] Message: %s, Stack: %s`, e.message, e.stack);
		}
	};
}
