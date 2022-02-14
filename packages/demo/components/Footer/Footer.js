import React from 'react';
import {footer, col, link, li} from './footer.module.css';

const columns = [
    {key: 'first', links: ['FAQ', 'Investor Relations', 'Privacy', 'Speed Test']},
    {key: 'second', links: ['Help Centre', 'Jobs', 'Cookie Preferences', 'Legal Notices']},
    {key: 'third', links: ['Account', 'Ways to Watch', 'Corporate Information', 'Demoflix Originals']},
    {key: 'fourth', links: ['Media Centre', 'Terms of Use', 'Contact Us']}
]

export function Footer() {
    return (
        <div className={footer}>
            {columns.map(({key, links}) => (
                <ul key={key}
                    className={col}>
                    {links.map(label => (
                        <li key={label}
                            className={li}>
                            <a className={link}
                               href="https://nft-pass.net">
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
}
