import { useState } from "react";
import {Buffer} from "buffer";

function SwapForm({swapId, swapHash, participant, id, secret, setRequest}) {
    const creds = `submarine-swap-client:submarine-swap-client`

    const [data, setData] = useState({
        data: {
            uid: swapId,
            state: participant.state
            }
    });

    const onClickOpen = () => {
        fetch('/api/v2/swap/submarine', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Basic ${Buffer.from(creds).toString('base64')}`
            },
            body: JSON.stringify({
                swap: { id: swapId, swapHash },
                party: {
                    id: id,
                    state: Object.assign(participant.state, {secret: secret})
                },
                opts: {

                }
            })
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(JSON.stringify(data))
                // console.log(`request: ${data.publicInfo.request}`)
                // setRequest(data.publicInfo.request)
            })

            .catch(err => console.log(err))
    }

    const onClickCommit = () => {
        fetch('/api/v2/swap/submarine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Basic ${Buffer.from(creds).toString('base64')}`
            },
            body: JSON.stringify({
                swap: { id: swapId },
                party: {
                    id: id,
                    state: participant.state
                },
                opts: {

                }
            })
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(JSON.stringify(data))
            })

            .catch(err => console.log(err))

    }

    return (
        <>
            <button onClick={onClickOpen}>Open Swap</button>
            <button onClick={onClickCommit}>Commit Swap</button>
            <p>participant id: {id}</p>
            <p>swapHash: {swapHash}</p>
            <p>swapSecret: {secret}</p>
        </>);


}
export default SwapForm;