import AdminJS, { Router as AdminRouter } from 'adminjs';
import { Router } from 'express';

import { AdminJSOptionsExtended } from '../types';

export const withProtectedRoutesHandler = (
    router: Router,
    admin: AdminJS
): void => {
    const { rootPath } = admin.options;

    router.use((req, res, next) => {
        if (AdminRouter.assets.find((asset) => req.originalUrl.match(asset.path))) {
            next();
        } else if (
            req.session.adminUser ||
            // these routes doesn't need authentication
            req.originalUrl.startsWith(admin.options.loginPath) ||
            req.originalUrl.startsWith(admin.options.logoutPath) ||
            req.originalUrl.startsWith((admin.options as AdminJSOptionsExtended).registerPath)
        ) {
            next();
        } else {
            // If the redirection is caused by API call to some action just redirect to resource
            const [redirectTo] = req.originalUrl.split('/actions');
            req.session.redirectTo = redirectTo.includes(`${rootPath}/api`)
                ? rootPath
                : redirectTo;
            req.session.save((err) => {
                if (err) {
                    next(err);
                }
                res.redirect(admin.options.loginPath);
            });
        }
    });
};
