import React from 'react';
import {nf_or, h1_nf_or, para1, call_to} from './original.module.css';

export function Original() {
    return (
        <div className={nf_or}>
            <h1 className={h1_nf_or}>Authentication Succeed!</h1>
            <div className={para1}>
                <span>
                    You have successfully logged into application with your NFT in the crypto-wallet.
                    This is an effective and safe mechanism, that can be configured incredibly fast and easy.
                </span>
                <div className={call_to}>
                    <a href="https://nft-pass.net/">
                        Click to Find out more!
                    </a>
                </div>
            </div>
        </div>
    );
}
