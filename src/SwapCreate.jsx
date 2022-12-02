import { useState } from "react";

function SwapCreate({setSwapId, setSwapHash, setSecretSeekerId, setSecretHolderId, setSecret}) {




    const [pressed, setPressed] = useState(false);
    const onClick = () => {

        fetch('/api/v1/swap/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                makerOrderProps: {
                    uid: 'uid1',
                    hash: null,
                    side: 'ask',
                    type: 'limit',
                    baseAsset: 'BTC1',
                    baseNetwork: 'lightning',
                    baseQuantity: 10000,
                    quoteAsset: 'BTC2',
                    quoteNetwork: 'lightning',
                    quoteQuantity: 30000
                },
                takerOrderProps: {
                    uid: 'uid0',
                    hash: null,
                    side: 'bid',
                    type: 'limit',
                    baseAsset: 'BTC1',
                    baseNetwork: 'lightning',
                    baseQuantity: 10000,
                    quoteAsset: 'BTC2',
                    quoteNetwork: 'lightning',
                    quoteQuantity: 30000
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
            <button onClick={onClick}>Create Swap</button>
        </>
    );

}

export default SwapCreate;