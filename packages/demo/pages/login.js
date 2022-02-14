import {useCallback, useRef, useState} from 'react';
import {Nav} from '../components/Nav/Nav';
import {LoginBanner} from '../components/LoginBanner/LoginBanner';
import {useNFTPassAuth} from '../hooks/useNFTPass';
import {Instruction} from '../components/Instruction/Instruction';

import metamask from './img/metamask.png';
import eth from './img/eth.png';
import rarible from './img/rarible.png';
import {LoginFooter} from '../components/LoginFooter/LoginFooter';

export default function Login() {
    const auth = useNFTPassAuth();
    const scrollToInstructionRef = useRef();
    const [loading, setLoading] = useState(false);

    const signin = useCallback(async () => {
        setLoading(true);
        await auth();
        setLoading(false);
    }, [auth]);
    return (
        <>
            <Nav isLogin={true}
                 signin={signin}/>
            <LoginBanner signin={signin}
                         loading={loading}
                         scrollToElementRef={scrollToInstructionRef}/>
            <Instruction ref={scrollToInstructionRef}
                         title="1. Setup Metamask account"
                         img={metamask.src}
                         inverted
                         text={(
                             <>
                                 <div>
                                     You need to have a Metamask wallet on Ropsten network to be able to retrieve the
                                     necessary NFT in the next steps.
                                 </div>
                                 <a href="https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047"
                                    style={{marginTop: 10, display: 'block'}}
                                    target="_blank">
                                     Please, find metamask installation instruction here.
                                 </a>
                             </>
                         )}/>
            <Instruction title="2. Get some rETH funds"
                         img={eth.src}
                         text={(
                             <>
                                 To get the NFT in the last step, your wallet should have some rETH funds. You can
                                 request them with no charge from public faucets
                                 <div style={{marginTop: 10}}>
                                     Please, proceed to faucets <a
                                     href="https://faucet.egorfine.com/"
                                     target="_blank">here</a> and <a href="https://faucet.dimensions.network/"
                                                                     target="_blank">
                                     here</a>.
                                 </div>
                             </>
                         )}/>
            <Instruction title="3. Buy the NFT configured for this demo"
                         img={rarible.src}
                         inverted
                         text={(
                             <>
                                 The last step is to get an NFT, that is used to authenticate in this demo. You will
                                 not spend any real ETH or other funds, because all the actions are performed on the
                                 Ropsten network.
                                 <div style={{marginTop: 10}}>
                                     Please, proceed to retrieving an NFT <a
                                     href="https://ropsten.rarible.com/token/0xa8a9bac3ed17b62da6c78da46a29b0f430993334:38379315447940042781061429637868126027683894212987120323516350956328141717505?tab=details"
                                     target="_blank">here</a>.
                                 </div>
                             </>
                         )}/>
            <LoginFooter signin={signin}/>
        </>
    )
}
