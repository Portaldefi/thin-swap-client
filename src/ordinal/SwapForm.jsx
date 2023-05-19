import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { useAppSelector } from '../store/hooks'
import getUser  from '../store/util'

function SwapForm({swapId, setSwapId, swapState, setSwapState, swapHash, setSwapHash, participant, id, setSecretSeekerId, setSecretHolderId, secret, setRequest}) {
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


    useEffect(() => {
        const pUser = getUser(user, participant)
        console.log("running useEffect", swapState)
        if(swapState === 0) {
            console.log("swapState: swap begins ", swapState)

        } else if(swapState === 1) {
            console.log("swapState: 1st order placed", swapState)

            pUser.Client.listen("swap.created",swap => {
                // dispatch(updateSwapStatus({ status: 2 }));
                console.log('swap.created event received', swap)
                if (participant.state.isSecretHolder) {
                    setSwapId(swap.id)
                    setSecretHolderId(swap.secretHolder.id)
                    setSecretSeekerId(swap.secretSeeker.id)
                    console.log('swap.secretHash: ', swap.secretHash)
                    console.log('swapHash: ', swapHash)
                    setSwapState(3);
                }

            })
        }
        else if (swapState === 2) {
            console.log("swapState: 2nd order placed", swapState)

            pUser.Client.listen("swap.created",swap => {
                // dispatch(updateSwapStatus({ status: 2 }));
                console.log('swap.created event received', swap)
                if (participant.state.isSecretHolder) {
                    setSwapId(swap.id)
                    setSecretHolderId(swap.secretHolder.id)
                    setSecretSeekerId(swap.secretSeeker.id)
                    console.log('swap.secretHash: ', swap.secretHash)
                    console.log('swapHash: ', swapHash)
                    setSwapState(3);
                }

            })
            // pUser.Client.listen("swap.opening", swap => {
            //     console.log('swap.opening event received', swap)
            //     // log("orderSecret in swap.opening shouldn't be null", orderSecret)
            // })
            // pUser.Client.listen("swap.opening", swap => {
            //     // dispatch(updateSwapStatus({ status: 3 }));
            //     console.log('swap.opening event received', swap)
            // })
        }
        else if (swapState ===3) {
            console.log("swapState: swap order request sent ", swapState)

            pUser.Client.listen("swap.created",swap => {
                // dispatch(updateSwapStatus({ status: 2 }));
                console.log('swap.created event received', swap)
                // if(user.user.id == swap.secretSeeker.id){ // TODO also add check if swapOpen already called on swap id
                //     const network = swap.secretHolder.network['@type'].toLowerCase();
                //     const credentials = user.user.credentials;
                //     setSwapState(2);
                //     console.log("swapOpen (secretSeeker) requested, sentsettingSwapState to 2");
                //     user.user.swapOpen(swap, { [network]: credentials[network]});
                // }
            })
            pUser.Client.listen("swap.opening", swap => {
                // dispatch(updateSwapStatus({ status: 3 }));
                console.log('swap.opening event received', swap)
                // console.log("orderSecret in swap.opening !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! shouldn't be null",orderSecret)
                // if(user.user.id == swap.secretHolder.id && orderSecret!=null) { // TODO also add check if swapOpen already called on swap id
                //     const network = swap.secretSeeker.network['@type'].toLowerCase();
                //     const credentials = user.user.credentials;
                //     // setSwapState(2);
                //     // console.log("settingSwapState to 2");
                //     user.user.swapOpen(swap, { [network]: credentials[network], secret });
                //     setSwapState(2);
                //     console.log("swapOpen (secretHolder) requested, settingSwapState to 2");
                // }
            })

        }
        // else if(swapState === 2) {
        //     console.log("swapState: swap.created/opening swapOpen sent", swapState)
        //     user.user.on("swap.opened",swap => {
        //         // dispatch(updateSwapStatus({ status: 4 }));
        //         log('swap.opened event received', swap)
        //         // log("orderSecret in swap.opened",orderSecret)
        //         if(user.user.id == swap.secretSeeker.id){
        //             const network = swap.secretHolder.network['@type'].toLowerCase();
        //             const credentials = user.user.credentials;
        //             user.user.swapCommit(swap, credentials);
        //             setSwapState(3);
        //             console.log("swapCommit (secretSeeker) requested, settingSwapState to 3");
        //         }
        //     })
        //     user.user.on("swap.committing",swap => {
        //         // dispatch(updateSwapStatus({ status: 5 }));
        //         log('swap.committing event received', swap)
        //         log("orderSecret in swap.committing",orderSecret)
        //
        //         if(user.user.id == swap.secretHolder.id){
        //             const network = swap.secretSeeker.network['@type'].toLowerCase();
        //             const credentials = user.user.credentials;
        //             user.user.swapCommit(swap, credentials);
        //             setSwapState(3);
        //             console.log("swapCommit (secretHolder) requested, settingSwapState to 3");
        //         }
        //
        //     })
        //
        // } else if(swapState === 3) {
        //     console.log("swapState swap.opened/committing swapCommit sent", swapState)
        //     user.user.on("swap.committed",swap => {
        //         log('swap.committed event received', swap)
        //
        //         let ethBal, btcBal;
        //
        //         if(user.user.id == swap.secretHolder.id){
        //             btcBal = toSats(node.balance) - swap.secretHolder.quantity;
        //             ethBal = toWei(wallet.balance) + swap.secretSeeker.quantity;
        //         } else {
        //             btcBal = toSats(node.balance) + swap.secretHolder.quantity;
        //             ethBal = toWei(wallet.balance) - swap.secretSeeker.quantity;
        //         }
        //
        //         console.log("swap claim completed, settingSwapState to 4");
        //         setSwapState(4);
        //
        //         const invoiceETH = user.user.id == swap.secretHolder.id ? swap.secretHolder.quantity : swap.secretSeeker.quantity;
        //         const invoiceBTC = user.user.id == swap.secretHolder.id ? swap.secretHolder.quantity : swap.secretSeeker.quantity;
        //         dispatch(setNodeBalance(fromSats(btcBal)))
        //         dispatch(setWalletBalance(fromWei(ethBal)))
        //     })
        //
        // }
        // // else if(swapState === 4) {
        // //   console.log("swapState ", swapState)
        // // } else if(swapState === 5) {
        // //   console.log("swapState ", swapState)}

    }, [swapState]);


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