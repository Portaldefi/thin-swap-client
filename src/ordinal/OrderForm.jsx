import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { useAppSelector } from '../store/hooks'
// import {createHash, randomBytes} from "crypto"
import getUser from '../store/util'


function OrderForm({setSwapId, setSwapHash, participant, setSecretHolderId, setSecretSeekerId, setSecret}) {
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


    const onClickPlaceOrder = () => {
        const side = participant.username === 'alice'? 'ask' : 'bid'

        const randomSecret = () => crypto.randomBytes(32)
        const sha256 = buffer => crypto.createHash('sha256').update(buffer).digest('hex')
        const secret = randomSecret()
        const swapHash = sha256(secret)
        const swapSecret = secret.toString('hex')

        fetch('/api/v2/orderbook/limit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Basic ${Buffer.from(creds).toString('base64')}`
            },
            body: JSON.stringify({
                uid: participant.username,
                side: side,
                hash: swapHash,
                baseAsset: 'BTCORD',
                baseNetwork: 'btc.btc',
                baseQuantity: 4000,
                quoteAsset: 'BTC',
                quoteNetwork: 'lightning.btc',
                quoteQuantity: 8000
            })
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(`\n\n`)
            console.log(JSON.stringify(data, null, 4))
            console.log(JSON.stringify(participant, null, 4))
        })

        .catch(err => console.log(err))

    }


    return (
        <>
            <button onClick={onClickPlaceOrder}>Place Order</button>
        </>);


}
export default OrderForm