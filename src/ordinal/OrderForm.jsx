import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { useAppSelector } from '../store/hooks'
// import {createHash, randomBytes} from "crypto"
import getUser from '../store/util'
import { hashSecret, newSecret } from '../utils/crypto.js'


function OrderForm({swapState, setSwapState, setSwapId, setSwapHash, participant, setSecretHolderId, setSecretSeekerId, setSecret}) {
    const creds = `submarine-swap-client:submarine-swap-client`


    console.log(`participant in SwapForm: ${JSON.stringify(participant)}`)

    // const [data, setData] = useState({
    //     data: {
    //         uid: swapId,
    //         state: participant.state
    //     }
    // });

    const users = useAppSelector(state => state.user)

    const user = getUser(users, participant)


    const onClickPlaceOrder = async () => {
        const side = participant.username === 'alice'? 'ask' : 'bid'

        const secret = await newSecret() ;
        console.log("new secret")
        console.log(secret)
        const swapHash = await hashSecret(secret)
        console.log("new secret hash: " + swapHash)

        const body = {
            uid: participant.username,
            side: side,
            hash: swapHash,
            baseAsset: 'BTCORD',
            baseNetwork: 'btc.btc',
            baseQuantity: 4000,
            quoteAsset: 'BTC',
            quoteNetwork: 'lightning.btc',
            quoteQuantity: 8000
        }


        fetch('/api/v2/orderbook/limit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Basic ${Buffer.from(creds).toString('base64')}`
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(`\n\n`)
            console.log(JSON.stringify(data, null, 4))
            console.log(JSON.stringify(participant, null, 4))
            setSwapState(swapState + 1)
        })

        .catch(err => console.log(err))

    }


    return (
        <>
            <button onClick={onClickPlaceOrder}>Place Order</button>
        </>);


}
export default OrderForm