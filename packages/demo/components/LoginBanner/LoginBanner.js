import {Grid} from 'react-loader-spinner';
import scrollToElement from 'scroll-to-element';

import {
    lb_main,
    lb_story,
    lb_h1,
    lb_h2,
    lb_instruction,
    lb_nav_instruction
} from './login-banner.module.css';
import {useCallback} from 'react';
import {GetStartedButton} from '../GetStartedButton/GetStartedButton';

export function LoginBanner({signin, loading, scrollToElementRef}) {
    const performScroll = useCallback(() => {
        if (!scrollToElementRef.current) return;
        scrollToElement(scrollToElementRef.current);
    }, [scrollToElementRef])

    return (
        <div className={lb_main}>
            {!loading ? (
                <div className={lb_story}>
                    <h1 className={lb_h1}>NFTPass demo application</h1>
                    <h2 className={lb_h2}>No emails, no passwords, no login forms</h2>
                    <h4 className={lb_instruction}>
                        <div>You can authenticate with NFT here</div>
                        <div>Please, see instructions for obtaining corresponding NFT below</div>
                        <GetStartedButton onClick={signin}/>
                        <a className={lb_nav_instruction}
                           onClick={performScroll}> Go to the instruction</a>
                    </h4>
                </div>
            ) : (
                <Grid color="white"
                      width={200}
                      height={200}/>
            )}
        </div>
    )
}
