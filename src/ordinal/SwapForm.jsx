import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { useAppSelector } from '../store/hooks'

function SwapForm({swapId, swapHash, participant, id, secret, setRequest}) {
    const creds = `submarine-swap-client:submarine-swap-client`


    console.log(`participant in SwapForm: ${JSON.stringify(participant)}`)

    const [data, setData] = useState({
        data: {
            uid: swapId,
            state: participant.state
            }
    });

    const user = useAppSelector(state => state.user)

    useEffect(() => {
        console.log('useEffect {user}', {user})
        console.log('participant: ', participant)
        let pUser
        user.forEach(person => {
            if (person.username === participant.username) {
                pUser = person
            }
        })
        console.log('pUser: ', pUser)
        if (typeof pUser !== 'undefined') {


            if (pUser.isLoggedIn) {
                console.log(`user logged in`, pUser.username)
                try {
                    console.log('user', pUser)
                    const connected = pUser.Client.connect()

                    console.log(`pUser: ${JSON.stringify(pUser)}`)
                    console.log(`connected: ${JSON.stringify(connected)}`)

                    const obj = {foo: 'bar'}

                    console.log(`user.Client: ${JSON.stringify(pUser.Client)}`)


                    // pUser.Client
                    //     .once('message', data => {
                    //         console.log(`message returned: ${JSON.stringify(data)}`)
                    //     })
                    //     ._send(obj)


                } catch (error) {
                    console.warn(`sorry an error occurred, due to ${error.message} `)
                    // logOut();
                }
            } else {
                console.log(`user not logged in`, pUser.username)
            }
        }
        else {
            console.log('participant is not available in user state yet')
        }
        return () => {
            if (user.isLoggedIn) user.user.disconnect()
            console.log('useEffect cleanup')
        }
    }, [user])

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
                console.log(`\n\n`)
                console.log(JSON.stringify(data, null, 4))
                console.log(JSON.stringify(participant.state, null, 4))
                console.log(participant.state.isSecretHolder)
                if (participant.state.isSecretHolder) {
                    console.log(`request: ${data.secretHolder.state.shared.request}`)
                    setRequest(data.secretHolder.state.shared.request)
                }
                else {
                    console.log(`request: ${data.secretHolder.state.shared.swapinfo.descriptor}`)
                    setRequest(data.secretHolder.state.shared.swapinfo.descriptor)
                }

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
                console.log(JSON.stringify(data, null, 4))
            })

            .catch(err => console.log(err))

    }

    const onClickCancel = () => {
        fetch('/api/v2/swap/submarine', {
            method: 'DELETE',
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
                console.log(JSON.stringify(data, null, 4))
            })

            .catch(err => console.log(err))

    }

    return (
        <>
            <button onClick={onClickOpen}>Open Swap</button>
            <button onClick={onClickCommit}>Commit Swap</button>
            <button onClick={onClickCancel}>Cancel Swap</button>
            <p>participant id: {id}</p>
            <p>swapHash: {swapHash}</p>
            <p>swapSecret: {secret}</p>
        </>);


}
export default SwapForm;