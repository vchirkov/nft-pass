import React, {useCallback} from 'react';
import classnames from 'classnames';
import {removeCookies} from 'cookies-next';
import {useRouter} from 'next/router';

import {useNFTPassAuth} from '../../hooks/useNFTPass';
import {
    navbar_main,
    navbar_login,
    demoflix_logo,
    nav_right,
    btn_join_now,
    btn_sign
} from './nav.module.css';

export function Nav({isLogin = false, signin, signout}) {

    return (
        <div className={classnames(navbar_main, {[navbar_login]: isLogin})}>
            <div className={demoflix_logo}>
                <img src="./logo.png" alt="demoflix_logo" height="40px"></img>
                <div className={nav_right}>
                    <span>UNLIMITED TV SHOWS & MOVIES</span>
                    {isLogin ? (
                        <button className={btn_join_now}
                                onClick={signin}>SIGN IN</button>
                    ) : (
                        <button className={btn_sign}
                                onClick={signout}>SIGN OUT</button>
                    )}
                </div>
            </div>
        </div>
    );
}
