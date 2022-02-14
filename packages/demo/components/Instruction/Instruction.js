import {forwardRef} from 'react';
import classnames from 'classnames';
import {
    in_container,
    in_main,
    in_inverted,
    in_text_container,
    in_image_container,
    in_title,
    in_text,
    in_image
} from './instruction.module.css';

export const Instruction = forwardRef(({title, text, img, inverted}, ref) => {
    return (
        <div className={in_container}
             ref={ref}>
            <div className={classnames(in_main, {[in_inverted]: inverted})}>
                <div className={in_text_container}>
                    <h2 className={in_title}>{title}</h2>
                    <div className={in_text}>{text}</div>
                </div>
                <div className={in_image_container}>
                    <img className={in_image}
                         src={img}
                         alt={title}/>
                </div>
            </div>
        </div>
    )
})
