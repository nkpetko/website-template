import https2 from 'spdy';
import { Express as IApplicationBuilder } from 'express-serve-static-core';
import { Server as httpserver } from 'http';
import { Server as httpsServer } from 'https';
import dotenv from 'dotenv';
import filestream from 'fs';
import { FASTLOG2, SFLog, SYNCHRONIZED_LOGGROUP } from './FastLog';
import { _baseDirName, _sslDirName } from './Directories';
import { URLS } from './Urls';

dotenv.config({ path: _baseDirName + '\\.env' });

// Use lOGGROUP to reference the loggroup that was defined elsewhere.
SYNCHRONIZED_LOGGROUP(URLS['EXAMPLE']);

// This will configure a default port 80 server.
export const Starter = (app: IApplicationBuilder, name: string, useHttps: boolean = true): [httpserver, httpsServer] => {
	try {
		let httpsServer = null;
		if (useHttps)
			httpsServer = https2
				.createServer(
					{
						cert: filestream.readFileSync(_sslDirName + '\\example.crt', 'utf-8'),
						key: filestream.readFileSync(_sslDirName + '\\example.key', 'utf-8'),
						passphrase: process.env['example_decryption_key'],
					},
					app,
				)
				.listen(443, name, () => FASTLOG2(SFLog[name], `[SFLog::%s] https://%s:443 Started`, name, name));
		let httpServer = app.listen(80, name, () => FASTLOG2(SFLog[name], `[SFLog::%s] http://%s:80 Started`, name, name));
		return [httpServer, httpsServer];
	} catch (err) {
		throw new Error(err);
	}
};
