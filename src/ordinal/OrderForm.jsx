import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { useAppSelector } from '../store/hooks'
// import {createHash, randomBytes} from "crypto"
import getUser from '../store/util'
import { hashSecret, newSecret, generateSecret } from '../utils/crypto.js'


function OrderForm({swapState, setSwapState, setSwapId, setSwapHash, participant, setSecretHolderId, setSecretSeekerId, setSecret}) {
    const creds = `submarine-swap-client:submarine-swap-client`
    const [baseQuantity, setBaseQuantity] = useState(4000)
    const [quoteQuantity, setQuoteQuantity] = useState(8000)
    const [ordinalLocation, setOrdinalLocation] = useState('<txn>:0:0')
    const [fee, setFee] = useState(0)


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

        // const rawSecret = await newSecret() ;
        // const swapHash = await hashSecret(rawSecret)
        // console.log("new secret hash: " + swapHash)
        // const secret = await secretHex(rawSecret)
        // console.log("new secret: ", secret)

        const secret = "e77cc1219f6db5019777f9f94d54a92589adef20aa8f72ac042d241434062da7"
        const swapHash = "ab441ccd82da7c1a4dcfd0ce711cc108ce54c6289293eb8d1755ece4463fb0af"

        if (participant.state.isSecretHolder) {
            setSecret(secret)
            setSwapHash(swapHash)
        }

        const body = {
            uid: participant.username,
            side: side,
            hash: swapHash,
            baseAsset: 'BTCORD',
            baseNetwork: 'btc.btc',
            baseQuantity: baseQuantity,
            quoteAsset: 'BTC',
            quoteNetwork: 'lightning.btc',
            quoteQuantity: quoteQuantity,
            ordinalLocation: ordinalLocation
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
            <p><label>ordinal quantity: <input type='number' value={baseQuantity} onChange={(evt) => setBaseQuantity(parseInt(evt.target.value, 10))}/></label></p>
            <p><label>payment quantity: <input type='number' value={quoteQuantity} onChange={(evt) => setQuoteQuantity(parseInt(evt.target.value, 10))}/></label></p>
            <p><label>ordinal location: <input type='text' value={ordinalLocation} onChange={(evt) => setOrdinalLocation(evt.target.value)} size="64"/></label></p>
           {/*<p><label>fee: <input type='number' value={fee} onChange={(evt) => setFee(parseInt(evt.target.value, 10))}/></label></p>*/}

        </>);


}
export default OrderForm