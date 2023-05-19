import { useState } from "react";

import SwapCreate from './SwapCreate.jsx'
import SwapForm from './SwapForm.jsx'
import SwapLogin from './SwapLogin.jsx'
import OrderForm from './OrderForm.jsx'

function SwapDemo() {
    const [swapId, setSwapId] = useState(null)
    const [swapHash, setSwapHash] = useState(null)
    const [secretSeekerId, setSecretSeekerId] = useState(null)
    const [secretHolderId, setSecretHolderId] = useState(null)
    const [secret, setSecret] = useState(null)
    const [request1, setRequest1] = useState(null)
    const [request2, setRequest2] = useState(null)
    const [swapState, setSwapState] = useState(0)
    const [alice0, setAlice0] = useState({
        state: {
            isSecretHolder: true,
            secret: secret,
            swapCreationResponder: true,
            },
        username: 'alice'
        })
    const [bob0, setBob0] = useState({
        state: {
            isSecretHolder: false,
            swapCreationResponder: false,
            },
        username: 'bob'
        })

    console.log(`alice0: ${JSON.stringify(alice0)}`)
    console.log(`bob0: ${JSON.stringify(bob0)}`)

    return (
        <>
            <h1>Ordinal Swap</h1>
            <SwapLogin participant={alice0}/>
            <p/>
            <SwapLogin participant={bob0}/>
            <p/>
            {/*<SwapCreate setSwapId={setSwapId} setSwapHash={setSwapHash} setSecretSeekerId={setSecretSeekerId} setSecretHolderId={setSecretHolderId} setSecret={setSecret}/>*/}
            <p>swapId: {swapId}</p>
            <p>L1-address: {request1}</p>
            <p>L2-invoice: {request2}</p>
            <OrderForm participant={alice0} swapState={swapState} setSwapState={setSwapState} setSwapId={setSwapId} setSwapHash={setSwapHash} setSecretSeekerId={setSecretSeekerId} setSecretHolderId={setSecretHolderId} setSecret={setSecret}/>
            <OrderForm participant={bob0} swapState={swapState} setSwapState={setSwapState} />
            <p/>
            <SwapForm swapId={swapId} setSwapId={setSwapId} swapState={swapState} setSwapState={setSwapState} swapHash={swapHash} setSwapHash={setSwapHash} participant={alice0} id={secretHolderId} setSecretSeekerId={setSecretSeekerId} setSecretHolderId={setSecretHolderId} setRequest={setRequest2} secret={secret}/>
            <SwapForm swapId={swapId} setSwapId={setSwapId} swapState={swapState} setSwapState={setSwapState} swapHash={swapHash} setSwapHash={setSwapHash} participant={bob0} id={secretSeekerId} setRequest={setRequest1}/>

        </>);
}

export default SwapDemo;