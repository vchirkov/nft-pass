import AdminJS from 'adminjs';
import { Router } from 'express';

import authTemplate from '../templates/auth-template';
import { AdminJSOptionsExtended, AuthenticationOptions } from '../types';

const getLoginPath = (admin: AdminJS): string => {
    const { loginPath, rootPath } = admin.options;
    // since we are inside already namespaced router we have to replace login and logout routes that
    // they don't have rootUrl inside. So changing /admin/login to just /login.
    // but there is a case where user gives / as a root url and /login becomes `login`. We have to
    // fix it by adding / in front of the route
    const normalizedLoginPath = loginPath.replace(rootPath, '');

    return normalizedLoginPath.startsWith('/')
        ? normalizedLoginPath
        : `/${normalizedLoginPath}`;
};

export const withLogin = (
    router: Router,
    admin: AdminJS,
    auth: AuthenticationOptions
): void => {
    const { rootPath } = admin.options;
    const loginPath = getLoginPath(admin);

    router.get(loginPath, async (req, res) => {
        const login = await authTemplate(admin, 'login', {
            action: admin.options.loginPath,
            link: (admin.options as AdminJSOptionsExtended).registerPath
        });
        res.send(login);
    });

    router.post(loginPath, async (req, res, next) => {
        const { email, password } = req.fields as {
            email: string;
            password: string;
        };
        const adminUser = await auth.authenticate(email, password);
        if (adminUser) {
            req.session.adminUser = adminUser;
            req.session.save((err) => {
                if (err) {
                    next(err);
                }
                if (req.session.redirectTo) {
                    res.redirect(302, req.session.redirectTo);
                } else {
                    res.redirect(302, rootPath);
                }
            });
        } else {
            const login = await authTemplate(admin, 'login', {
                action: admin.options.loginPath,
                link: (admin.options as AdminJSOptionsExtended).registerPath,
                errorMessage: 'invalidCredentials'
            });
            res.send(login);
        }
    });
};
