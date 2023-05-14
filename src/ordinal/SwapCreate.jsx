import { useState, useEffect } from "react";

import {Buffer} from 'buffer'
import { useAppDispatch, useAppSelector } from '../store/hooks'


function SwapCreate({setSwapId, setSwapHash, setSecretSeekerId, setSecretHolderId, setSecret}) {
    const [baseQuantity, setBaseQuantity] = useState(50000)
    const [fee, setFee] = useState(1000)

    const [pressed, setPressed] = useState(false);
    const onClick = () => {
        // alice1 - from wallets.json - "wif": "cQBwuzEBYQrbWKFZZFpgitRpdDDxUrT1nzvhDWhxMmFtWdRnrCSm",
        const creds = `submarine-swap-client:submarine-swap-client`

        fetch('/api/v2/swap/submarine-create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Basic ${Buffer.from(creds).toString('base64')}`
            },
            body: JSON.stringify({

                holderSubmarineSwapProps: {
                    uid: 'alice',
                    hash: null,
                    party: 'secretHolder',
                    quantity: baseQuantity,
                    fee: fee,
                    asset: 'BTC',
                    templateProps: {
                        "version": "v2",
                        "nodes": {
                            "submarine": [
                                {
                                    "nodetype": "lnd",
                                    "network": "lightning.btc",
                                    "fungible": true,
                                    "asset": "BTC",
                                    "socket": "localhost:10004",
                                    "cert": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKekNDQWMyZ0F3SUJBZ0lSQUw2M0EyTmZkVGgvTlVJdzhNcGY3dFl3Q2dZSUtvWkl6ajBFQXdJd01URWYKTUIwR0ExVUVDaE1XYkc1a0lHRjFkRzluWlc1bGNtRjBaV1FnWTJWeWRERU9NQXdHQTFVRUF4TUZZV3hwWTJVdwpIaGNOTWpNd05UQXhNRE0wTVRNM1doY05NalF3TmpJMU1ETTBNVE0zV2pBeE1SOHdIUVlEVlFRS0V4WnNibVFnCllYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmhiR2xqWlRCWk1CTUdCeXFHU000OUFnRUcKQ0NxR1NNNDlBd0VIQTBJQUJEVVhZRThXTVpZeVlsMWFscVVQZ2ErdmVydWRiZHJ5NGEyVEttbVFYdzl2Y2hCRwp4dW95cTRKd0ZNVklEbEZVSXNmUmU3MWo4VFVwZVg0NXpKbGpuWXlqZ2NVd2djSXdEZ1lEVlIwUEFRSC9CQVFECkFnS2tNQk1HQTFVZEpRUU1NQW9HQ0NzR0FRVUZCd01CTUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3SFFZRFZSME8KQkJZRUZONHpuSE9NVzBmTzdlTHU2aEp6T2NvZlNUaVpNR3NHQTFVZEVRUmtNR0tDQldGc2FXTmxnZ2xzYjJOaApiR2h2YzNTQ0JXRnNhV05sZ2c1d2IyeGhjaTF1T0MxaGJHbGpaWUlFZFc1cGVJSUtkVzVwZUhCaFkydGxkSUlIClluVm1ZMjl1Ym9jRWZ3QUFBWWNRQUFBQUFBQUFBQUFBQUFBQUFBQUFBWWNFckJjQUF6QUtCZ2dxaGtqT1BRUUQKQWdOSUFEQkZBaUJYVURaZFZmZW1QaUxROEQ2a3MvRWtEWnNHeUU2c29sdExvdm5zajZJRHZRSWhBSnkwWmRIawpBV1pIZjA5QlM3OVZvdnBKMlQzZ09Ndnl5Z2NqUDVHSlczR2wKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
                                    "admin": "AgEDbG5kAvgBAwoQBgxDOFx9ddvxKD4020siNhIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYgdwcvQQYxosM2QvqMthyWBQ4WRNNxG+2R1lS8bM4oNlg=",
                                    "invoice": "AgEDbG5kAlgDChAEDEM4XH112/EoPjTbSyI2EgEwGhYKB2FkZHJlc3MSBHJlYWQSBXdyaXRlGhcKCGludm9pY2VzEgRyZWFkEgV3cml0ZRoPCgdvbmNoYWluEgRyZWFkAAAGIFIfSyjl4BfuVV4CKFVa6pop5H/TOcLRYFTHWQfEE9Qf"
                                },
                                {
                                    "nodetype": "bitcoind",
                                    "network": "bitcoin",
                                    "fungible": true,
                                    "asset": "BTC",
                                    "rpcuser": "bitcoind-regtest-rpcuser0",
                                    "rpcpassword": "UFIeQGQOjGV6BVn6VmOhaqjbFLXFaXSgjqhOfK",
                                    "rpcport": 20332,
                                    "wif": "cVL9j83fcrp6Qw8h4dLrMg3HxrTVeHNW4uvmoHjKPxUB11cyoFdc"
                                }
                            ]
                        }
                    }
                },
                seekerSubmarineSwapProps: {
                    uid: 'bob',
                    hash: null,
                    party: 'secretSeeker',
                    quantity: baseQuantity,
                    fee: 0,
                    asset: 'BTC',
                    templateProps: {
                        "version": "v2",
                        "nodes": {
                            "submarine": [
                                {
                                    "nodetype": "lnd",
                                    "network": "lightning.btc",
                                    "fungible": true,
                                    "asset": "BTC",
                                    "socket": "localhost:10004",
                                    "cert": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKekNDQWMyZ0F3SUJBZ0lSQUw2M0EyTmZkVGgvTlVJdzhNcGY3dFl3Q2dZSUtvWkl6ajBFQXdJd01URWYKTUIwR0ExVUVDaE1XYkc1a0lHRjFkRzluWlc1bGNtRjBaV1FnWTJWeWRERU9NQXdHQTFVRUF4TUZZV3hwWTJVdwpIaGNOTWpNd05UQXhNRE0wTVRNM1doY05NalF3TmpJMU1ETTBNVE0zV2pBeE1SOHdIUVlEVlFRS0V4WnNibVFnCllYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmhiR2xqWlRCWk1CTUdCeXFHU000OUFnRUcKQ0NxR1NNNDlBd0VIQTBJQUJEVVhZRThXTVpZeVlsMWFscVVQZ2ErdmVydWRiZHJ5NGEyVEttbVFYdzl2Y2hCRwp4dW95cTRKd0ZNVklEbEZVSXNmUmU3MWo4VFVwZVg0NXpKbGpuWXlqZ2NVd2djSXdEZ1lEVlIwUEFRSC9CQVFECkFnS2tNQk1HQTFVZEpRUU1NQW9HQ0NzR0FRVUZCd01CTUE4R0ExVWRFd0VCL3dRRk1BTUJBZjh3SFFZRFZSME8KQkJZRUZONHpuSE9NVzBmTzdlTHU2aEp6T2NvZlNUaVpNR3NHQTFVZEVRUmtNR0tDQldGc2FXTmxnZ2xzYjJOaApiR2h2YzNTQ0JXRnNhV05sZ2c1d2IyeGhjaTF1T0MxaGJHbGpaWUlFZFc1cGVJSUtkVzVwZUhCaFkydGxkSUlIClluVm1ZMjl1Ym9jRWZ3QUFBWWNRQUFBQUFBQUFBQUFBQUFBQUFBQUFBWWNFckJjQUF6QUtCZ2dxaGtqT1BRUUQKQWdOSUFEQkZBaUJYVURaZFZmZW1QaUxROEQ2a3MvRWtEWnNHeUU2c29sdExvdm5zajZJRHZRSWhBSnkwWmRIawpBV1pIZjA5QlM3OVZvdnBKMlQzZ09Ndnl5Z2NqUDVHSlczR2wKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
                                    "admin": "AgEDbG5kAvgBAwoQBgxDOFx9ddvxKD4020siNhIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYgdwcvQQYxosM2QvqMthyWBQ4WRNNxG+2R1lS8bM4oNlg=",
                                    "invoice": "AgEDbG5kAlgDChAEDEM4XH112/EoPjTbSyI2EgEwGhYKB2FkZHJlc3MSBHJlYWQSBXdyaXRlGhcKCGludm9pY2VzEgRyZWFkEgV3cml0ZRoPCgdvbmNoYWluEgRyZWFkAAAGIFIfSyjl4BfuVV4CKFVa6pop5H/TOcLRYFTHWQfEE9Qf"
                                },
                                {
                                    "nodetype": "bitcoind",
                                    "network": "bitcoin",
                                    "fungible": true,
                                    "asset": "BTC",
                                    "rpcuser": "bitcoind-regtest-rpcuser0",
                                    "rpcpassword": "UFIeQGQOjGV6BVn6VmOhaqjbFLXFaXSgjqhOfK",
                                    "rpcport": 20332,
                                    "wif": "cVL9j83fcrp6Qw8h4dLrMg3HxrTVeHNW4uvmoHjKPxUB11cyoFdc"
                                }
                            ]
                        }
                    }
                }
            })
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                // console.log(data.swap.id)
                console.log(`${JSON.stringify(data, null, 2)}`)
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
            <p><button onClick={onClick}>Create Swap</button></p>
            <p><label>quantity: <input type='number' value={baseQuantity} onChange={(evt) => setBaseQuantity(parseInt(evt.target.value, 10))}/></label></p>
            <p><label>fee: <input type='number' value={fee} onChange={(evt) => setFee(parseInt(evt.target.value, 10))}/></label></p>

        </>
    );
}

export default SwapCreate;