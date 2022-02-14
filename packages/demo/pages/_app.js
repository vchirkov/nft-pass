import '../styles/globals.css';
import {ToastContainer} from 'react-toastify';

function MyApp({Component, pageProps}) {
    return (
        <>
            <Component {...pageProps} />
            <ToastContainer theme="dark" position="bottom-right"/>
        </>
    );
}

export default MyApp;
