import {get_started} from './get-started-button.module.css';

export function GetStartedButton(props) {
    return (
        <button className={get_started}
                {...props}>
            Get Started!
        </button>
    )
}
