import React from 'react';

import {card, content, img, link} from './card.module.css';

export function Card(props) {
    return (
        <div className={card}>
            <div className={content}>
                <a className={link}
                   href={props.link}
                   target="_blank">
                    <img className={img}
                         src={props.img}
                         alt={props.name}/>
                </a>
            </div>
        </div>
    );
}
