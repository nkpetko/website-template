import { Express as IApplicationBuilder, Request, Response } from 'express-serve-static-core';
import { FASTLOG2, FASTLOG3, FASTLOGS, SFLog } from '../Util/FastLog';
import { _baseDirName } from '../Util/Directories';
import { walk } from '../Util/FileWalker';
import filestream from 'fs';

interface EndpointOpts {
	path?: string;
	logSetups?: boolean;
	apiName?: string;
}

const MapControllers = (app?: IApplicationBuilder, opts?: EndpointOpts): Promise<void> => {
	return new Promise(async (resumeFunc) => {
		const directory = (opts !== undefined ? opts.path : _baseDirName + '\\Controllers') || _baseDirName + '\\Controllers';
		if (!filestream.existsSync(directory)) {
			FASTLOG3(
				SFLog[opts.apiName],
				`[SFLog::%s] The directory %s for the api %s was not found, make sure you configured your directory correctly.`,
				opts.apiName,
				directory,
				opts.apiName,
			);
			return resumeFunc();
		}
		const r = walk(directory);
		let count = 0;
		r.forEach((v) => {
			let name = v.replace(directory, '');
			if (name.match(/.+\.js/)) {
				name = name.replace('.js', '');
				name = name.split('_P-').join(':');
				name = name.split('\\').join('/');
				if (name === '/__pageIndex') name = '/';
				let map: {
					default: { func: (request: Request, Response: Response) => unknown; method: string };
				};

				try {
					map = require(v);
				} catch (err) {
					return FASTLOG2(SFLog[opts.apiName], '[SFLog::%s] %s', opts.apiName, err.message);
				}
				let func: (request: Request, Response: Response) => unknown;
				let method: string;
				if (map.default) {
					if (map.default.func) func = map.default.func;
					else return;
					if (map.default.method) method = map.default.method.toLowerCase();
					else return;
					count++;
					try {
						if (method === 'get') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping GET %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.get(name, func);
						} else if (method === 'head') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping HEAD %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.head(name, func);
						} else if (method === 'post') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping POST %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.post(name, func);
						} else if (method === 'put') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping PUT %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.put(name, func);
						} else if (method === 'delete') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping DELETE %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.delete(name, func);
						} else if (method === 'connect') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping CONNECT %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.connect(name, func);
						} else if (method === 'options') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping OPTIONS %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.options(name, func);
						} else if (method === 'trace') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping TRACE %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.trace(name, func);
						} else if (method === 'patch') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping PATCH %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.patch(name, func);
						} else if (method === 'all') {
							if (opts.logSetups)
								FASTLOG2(
									SFLog[opts.apiName],
									`[SFLog::%s] Mapping ALL %s`,
									opts.apiName,
									(opts.apiName ? 'https://' + opts.apiName : '') + name,
								);
							app.all(name, func);
						} else {
							return FASTLOGS(SFLog[opts.apiName], '[SFLog::%s] Error requesting Controller.', opts.apiName);
						}
					} catch (err) {
						return FASTLOG2(SFLog[opts.apiName], '[SFLog::%s] %s', opts.apiName, err.message);
					}
				} else {
					return FASTLOGS(SFLog[opts.apiName], '[SFLog::%s] This Controller had no default export.', opts.apiName);
				}
			}
		});
		FASTLOG3(SFLog[opts.apiName], `[SFLog::%s] https://%s has %d controller(s)`, opts.apiName, opts.apiName, count);
		resumeFunc();
	});
};
export default MapControllers;
