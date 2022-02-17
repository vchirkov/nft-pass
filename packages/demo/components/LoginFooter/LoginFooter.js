import React, {useCallback} from 'react';
import scrollToElement from 'scroll-to-element';
import {GetStartedButton} from '../GetStartedButton/GetStartedButton';

import {lf_main, lf_header, lf_container} from './login-footer.module.css';

export function LoginFooter({signin}) {
    const handleClick = useCallback(() => {
        scrollToElement(window.document.body);
        signin && signin();
    }, [signin]);

    return (
        <div className={lf_container}>
            <div className={lf_main}>
                <h2 className={lf_header}>You are all set!</h2>
                <div>
                    After completing the steps above, you have everything ready to authenticate via an NFT.
                </div>
                <div>
                    Please, click any "Sign In" or "Get Started" button.
                </div>
                <GetStartedButton onClick={handleClick}/>
            </div>
        </div>
    );
}
