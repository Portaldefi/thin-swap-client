import { useState, useEffect } from "react";

import {Buffer} from 'buffer'
import { useAppDispatch, useAppSelector } from '../store/hooks'


function SwapCreate({setSwapId, setSwapHash, setSecretSeekerId, setSecretHolderId, setSecret}) {
    const [baseQuantity, setBaseQuantity] = useState(50000)
    const [fee, setFee] = useState(1000)

    const [pressed, setPressed] = useState(false);
    const onClick = () => {
        // alice1 - from wallets.json - "wif": "cQBwuzEBYQrbWKFZZFpgitRpdDDxUrT1nzvhDWhxMmFtWdRnrCSm",
        const creds = `submarine-swap-client:submarine-swap-client`

        fetch('/api/v2/swap/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Basic ${Buffer.from(creds).toString('base64')}`
            },
            body: JSON.stringify({
                swapType: 'ordinal',
                secretHolderProps: {
                    uid: 'alice',
                    hash: null,
                    party: 'secretHolder',
                    quantity: baseQuantity,
                    fee: fee,
                    asset: 'BTC'
                },
                secretSeekerProps: {
                    uid: 'bob',
                    hash: null,
                    party: 'secretSeeker',
                    quantity: baseQuantity,
                    fee: 0,
                    asset: 'BTC'
                }
            })
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                // console.log(data.swap.id)
                console.log(`${JSON.stringify(data, null, 2)}`)
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
            <p><label>quantity: <input type='number' value={baseQuantity} onChange={(evt) => setBaseQuantity(parseInt(evt.target.value, 10))}/></label></p>
            <p><label>fee: <input type='number' value={fee} onChange={(evt) => setFee(parseInt(evt.target.value, 10))}/></label></p>

        </>
    );
}

export default SwapCreate;