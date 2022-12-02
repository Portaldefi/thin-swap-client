import { useState } from "react";

function SwapForm({swapId, swapHash, participant, id, secret}) {

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
                swap: { id: swapId },
                party: {
                    id: id,
                    state: participant.state
                }
            })
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(JSON.stringify(data))
                console.log(`request1: ${data.publicInfo.left.request}`)
                console.log(`request2: ${data.publicInfo.right.request}`)
            })

            .catch(err => console.log(err))
    }

    const onClickCommit = () => {}

    return (
        <>
            <button onClick={onClickOpen}>Open Swap</button>
            <button onClick={onClickCommit}>Commit Swap</button>
            <p>participant id: {id}</p>
            <p>swapHash: {swapHash}</p>
            <p>swapSecret: {secret}</p>
            <p>{JSON.stringify(data)}</p>
        </>);


}
export default SwapForm;