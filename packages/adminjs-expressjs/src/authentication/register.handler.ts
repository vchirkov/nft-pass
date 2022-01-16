import AdminJS from 'adminjs';
import { Router } from 'express';

import authTemplate from '../templates/auth-template';
import { AdminJSOptionsExtended, AuthenticationOptions } from '../types';

const getRegisterPath = (admin: AdminJS): string => {
    const { rootPath } = admin.options;
    const { registerPath } = admin.options as AdminJSOptionsExtended;
    // since we are inside already namespaced router we have to replace register and logout routes that
    // they don't have rootUrl inside. So changing /admin/register to just /register.
    // but there is a case where user gives / as a root url and /register becomes `register`. We have to
    // fix it by adding / in front of the route
    const normalizedRegisterPath = registerPath.replace(rootPath, '');

    return normalizedRegisterPath.startsWith('/')
        ? normalizedRegisterPath
        : `/${normalizedRegisterPath}`;
};

export const withRegister = (
    router: Router,
    admin: AdminJS,
    auth: AuthenticationOptions
): void => {
    const { rootPath } = admin.options;
    const registerPath = getRegisterPath(admin);

    router.get(registerPath, async (req, res) => {
        const register = await authTemplate(admin, 'register', {
            action: (admin.options as AdminJSOptionsExtended).registerPath,
            link: admin.options.loginPath
        });
        res.send(register);
    });

    router.post(registerPath, async (req, res, next) => {
        const { email, password } = req.fields as {
            email: string;
            password: string;
        };
        const adminUser = await auth.register(email, password);
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
            const register = await authTemplate(admin, 'register', {
                action: (admin.options as AdminJSOptionsExtended).registerPath,
                link: admin.options.loginPath,
                errorMessage: 'cannotRegister'
            });
            res.send(register);
        }
    });
};
