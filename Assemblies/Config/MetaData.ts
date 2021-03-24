export default {
	UsePages: true,
	PageOpts: {
		etag: false,
		redirect: true,
		lastModified: false,
		setHeaders: (res: { set: (arg0: string, arg1: string) => void }): void => {
			res.set('x-powered-by', 'ASP.NET');
			res.set('server', 'Amazon S3');
		},
	},
	UseEndpoints: true,
	UseRouting: true,
};
