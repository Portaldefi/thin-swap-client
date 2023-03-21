import { useState } from "react";

import {Buffer} from 'buffer';


function SwapCreate({setSwapId, setSwapHash, setSecretSeekerId, setSecretHolderId, setSecret}) {
    const [baseQuantity, setBaseQuantity] = useState(50000)
    const [quoteQuantity, setQuoteQuantity] = useState(50000)


    const [pressed, setPressed] = useState(false);
    const onClick = () => {

        const creds = `submarine-swap-client:submarine-swap-client`

        fetch('/api/v2/swap/submarine-create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Basic ${Buffer.from(creds).toString('base64')}`
            },
            body: JSON.stringify({
                holderSubmarineSwapProps: {
                    uid: 'alice',
                    hash: null,
                    party: 'secretHolder',
                    quantity: baseQuantity,
                    asset: 'BTC'
                },
                seekerSubmarineSwapProps: {
                    uid: 'carol',
                    hash: null,
                    party: 'secretSeeker',
                    quantity: baseQuantity,
                    asset: 'BTC'
                }
            })
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data.swap.id)
                console.log(`${JSON.stringify(data)}`)
                setSwapId(data.swap.id)
                setSecretSeekerId(data.swap.secretSeeker.id)
                setSecretHolderId(data.swap.secretHolder.id)
                setSecret(data.swapSecret)
                setSwapHash(data.swap.secretHash)
            })

            .catch(err => console.log(err))
    }
    return (
        <>
            <p><button onClick={onClick}>Create Swap</button></p>
            <p><label>Base Quantity: <input type='number' value={baseQuantity} onChange={(evt) => setBaseQuantity(evt.target.value)}/></label></p>
            <p><label>Quote Quantity: <input type='number' value={quoteQuantity} onChange={(evt) => setQuoteQuantity(evt.target.value)}/></label></p>

        </>
    );
}

export default SwapCreate;