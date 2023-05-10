import { useState } from "react";

import SwapCreate from './SwapCreate.jsx'
import SwapForm from './SwapForm.jsx'

function SwapDemo() {
    const [swapId, setSwapId] = useState(null)
    const [swapHash, setSwapHash] = useState(null)
    const [secretSeekerId, setSecretSeekerId] = useState(null)
    const [secretHolderId, setSecretHolderId] = useState(null)
    const [secret, setSecret] = useState(null)
    const [request1, setRequest1] = useState(null)
    const [request2, setRequest2] = useState(null)
    const [alice, setAlice] = useState({
        state: {
            isSecretHolder: true,
            secret: secret,

            }
        })
    const [carol, setCarol] = useState({
        state: {
            isSecretHolder: false,

            }
        })

    return (
        <>
            <h1>Ordinal Swap</h1>
            <SwapCreate setSwapId={setSwapId} setSwapHash={setSwapHash} setSecretSeekerId={setSecretSeekerId} setSecretHolderId={setSecretHolderId} setSecret={setSecret}/>
            <p>swapId: {swapId}</p>
            <p>L1-address: {request1}</p>
            <p>L2-invoice: {request2}</p>
            <SwapForm swapId={swapId} swapHash={swapHash} participant={alice} id={secretHolderId} setRequest={setRequest2} secret={secret}/>
            <SwapForm swapId={swapId} swapHash={swapHash} participant={carol} id={secretSeekerId} setRequest={setRequest1}/>

        </>);
}

export default SwapDemo;