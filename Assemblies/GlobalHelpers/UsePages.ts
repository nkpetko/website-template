import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { static as Pages } from 'express';
import { OutgoingMessage } from 'http';
import { _baseDirName } from '../Util/Directories';
import fs from 'fs';
import { FASTLOGS, FLog, LOGVARIABLE } from '../Util/FastLog';

interface PageDirOpts {
	path?: string;
}
interface PageOpts<R extends OutgoingMessage = OutgoingMessage> {
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
}

LOGVARIABLE('Pages', 0);

const UsePages = (app: IApplicationBuilder, opts: PageDirOpts, PagesOpts: PageOpts): Promise<void> => {
	return new Promise((r) => {
		const path = (opts !== undefined ? opts.path : _baseDirName + '\\StaticPages') || _baseDirName + '\\StaticPages';
		if (!fs.existsSync(path)) {
			FASTLOGS(
				FLog['Pages'],
				`[FLog::Pages] The directory %s was not found, make sure you configured your directory correctly. Static pages, so this will that return ctx::resumeFunc()`,
				path,
			);
		}
		app.use(Pages(path, PagesOpts));
		r();
	});
};
export default UsePages;
