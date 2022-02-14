import React from 'react';
import {GetStartedButton} from '../GetStartedButton/GetStartedButton';

import {lf_main, lf_header, lf_container} from './login-footer.module.css';

export function LoginFooter({signin}) {
    return (
        <div className={lf_container}>
            <div className={lf_main}>
                <h2 className={lf_header}>You are all set!</h2>
                <div>
                    After completing steps above, you have everything ready to authenticate via NFT.
                </div>
                <div>
                    Please, click any "Sign In" or "Get Started" button.
                </div>
                <GetStartedButton onClick={signin}/>
            </div>
        </div>
    );
}
