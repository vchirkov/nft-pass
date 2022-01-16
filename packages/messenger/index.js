import {EventEmitter} from 'events';

export class Messenger extends EventEmitter {
    constructor(targetWindow = window.parent, autoListen = true) {
        super();
        this.target = targetWindow;
        this.listener = (e) => e.data._NFTPass && e.data.type && super.emit(e.data.type, e.data.data);
        if (autoListen) this.listen();
    }

    listen() {
        window.addEventListener('message', this.listener);
    }

    stop() {
        window.removeEventListener('message', this.listener);
    }

    send(type, data) {
        this.target.postMessage({type, data, _NFTPass: true}, '*');
    }

    wait(type) {
        return new Promise(res => super.once(type, data => res(data)));
    }
}
