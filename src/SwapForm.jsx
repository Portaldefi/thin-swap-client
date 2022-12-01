import { useState } from "react";

function SwapForm({swapId, participant}) {

    const [data, setData] = useState({
        data: {
            uid: swapId,
            state: participant.state
            }
    });

    const onClickOpen = () => {
        fetch('/api/v1/swap', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
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
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data.id)
                setSwapId(data.id)
            })

            .catch(err => console.log(err))
    }

    const onClickCommit = () => {}

    return (
        <>
            <button onClick={onClickOpen}>Open Swap</button>
            <button onClick={onClickCommit}>Commit Swap</button>
            <p>data: {JSON.stringify(data)}</p>
        </>);


}
export default SwapForm;