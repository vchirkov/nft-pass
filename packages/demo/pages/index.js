import {useCallback} from 'react';
import {removeCookies} from 'cookies-next';
import {useRouter} from 'next/router';
import {Original} from '../components/Original/Original';
import {Popular} from '../components/Popular/Popular';
import {ChildrenFamilyTV} from '../components/ChildrenFamilyTV/ChildrenFamilyTV';
import {ExcitingTV} from '../components/ExcitingTV/ExcitingTV';
import {Bingeworthy} from '../components/Bingeworthy/Bingeworthy';
import {Footer} from '../components/Footer/Footer';
import {withSession} from '../helpers/withSession';
import {Nav} from '../components/Nav/Nav';


export const getServerSideProps = withSession();

export default function Home() {
    const router = useRouter();
    const signout = useCallback(async () => {
        removeCookies('x-nftpass-demo-auth');
        await router.push('/login');
    }, [router]);
    return (
        <>
            <Nav signout={signout}/>
            <Original/>
            <Popular/>
            <ChildrenFamilyTV/>
            <ExcitingTV/>
            <Bingeworthy/>
            <Footer/>
        </>
    )
}
