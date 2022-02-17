import {useCallback, useRef, useState} from 'react';
import {Nav} from '../components/Nav/Nav';
import {LoginBanner} from '../components/LoginBanner/LoginBanner';
import {useNFTPassAuth} from '../hooks/useNFTPass';
import {Instruction} from '../components/Instruction/Instruction';

import metamask from './img/metamask.png';
import eth from './img/eth.png';
import rarible from './img/rarible.png';
import {LoginFooter} from '../components/LoginFooter/LoginFooter';
import {MetamaskTestnet} from '../components/MetamaskTestnet/MetamaskTestnet';

export default function Login() {
    const auth = useNFTPassAuth();
    const scrollToInstructionRef = useRef();
    const [loading, setLoading] = useState(false);
    const [metamaskTestnetHidden, setMetamaskTestnetHidden] = useState(true);

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
                                     You need to have a Metamask wallet on the Ropsten network to be able to retrieve
                                     the necessary NFT in the next steps.
                                 </div>
                                 <a href="https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047"
                                    style={{margin: '10px 0', display: 'block'}}
                                    target="_blank">
                                     Please, find the Metamask installation instruction here.
                                 </a>
                                 <a style={{fontSize: 20}}
                                    href="#metamask-testnet"
                                    onClick={e => {
                                        e.preventDefault();
                                        setMetamaskTestnetHidden(!metamaskTestnetHidden)
                                    }}>
                                     Show instruction on how to connect wallet to the Ropsten network.
                                 </a>
                             </>
                         )}/>
            <MetamaskTestnet hidden={metamaskTestnetHidden}/>
            <Instruction title="2. Get some rETH funds"
                         img={eth.src}
                         text={(
                             <>
                                 <div>
                                     To get the NFT in the last step, your wallet should have some rETH funds. You can
                                     request them at no charge from public faucets.
                                 </div>
                                 <div style={{margin: '10px 0'}}>
                                     Please, proceed to faucets <a
                                     href="https://faucet.egorfine.com/"
                                     target="_blank">here</a>, <a href="https://faucet.dimensions.network/"
                                                                  target="_blank">
                                     here</a>, or <a href="https://faucet.metamask.io/"
                                                     target="_blank">
                                     here</a>.
                                 </div>
                                 <div style={{fontSize: 11}}>
                                     It might take a couple of minutes to get rETH, so it is recommended to
                                     request from all of them.
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
