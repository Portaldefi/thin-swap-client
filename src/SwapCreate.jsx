import { useState } from "react";

function SwapCreate() {
    const [pressed, setPressed] = useState(false);
    const onClick = () => {
        fetch('/api/v1/swap/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            // body: JSON.stringify({ 'id': 2 } )
            body: JSON.stringify({
                makerOrderProps: {
                    uid: 'uid0',
                    hash: 'aaaa',
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
                    uid: 'uid1',
                    hash: 'aaaa',
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
            // .then(res => console.log(res))
            .then(res => {
                return res.json()
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
            // .then(res => console.log(res))
        //console.log("hello")
    }
    return (
      <button onClick={onClick}>Create Swap</button>
    );

}

export default SwapCreate;