import React from 'react';
import classnames from 'classnames';

import {
    mt_container,
    mt_main,
    mt_hidden,
    mt_item,
    mt_item_text,
    mt_item_img
} from './metamask-testnet.module.css';
import testnet_1 from './img/testnet_1.png';
import testnet_2 from './img/testnet_2.png';
import testnet_3 from './img/testnet_3.png';

const info = [
    {
        text: 'At the top of the extension, you can find the network selector. You need to click "Show/Hide test networks".',
        img: testnet_1.src
    },
    {
        text: 'Then you need to set toggler to the enabled state.',
        img: testnet_2.src
    },
    {
        text: 'After that, you will be able to select Ropsten from the initial dropdown!',
        img: testnet_3.src
    }
]

export function MetamaskTestnet({hidden}) {
    return (
        <div className={classnames(mt_container, {[mt_hidden]: hidden})}>
            <div className={mt_main}>
                {info.map(item => (
                    <div className={mt_item}
                         key={item.img}>
                        <div className={mt_item_text}>
                            {item.text}
                        </div>
                        <img className={mt_item_img} src={item.img}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
