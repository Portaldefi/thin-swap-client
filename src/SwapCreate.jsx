import { useState } from "react";

import {Buffer} from 'buffer';


function SwapCreate({setSwapId, setSwapHash, setSecretSeekerId, setSecretHolderId, setSecret}) {
    const [baseQuantity, setBaseQuantity] = useState(50000)
    // const [quoteQuantity, setQuoteQuantity] = useState(50000)


    const [pressed, setPressed] = useState(false);
    const onClick = () => {

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
                    asset: 'BTC',
                    templateProps: {
                        "version": "v2",
                        "nodes": {
                            "submarine": [{
                                "nodetype": "lnd",
                                "network": "lightning.btc",
                                "fungible": true,
                                "asset": "BTC",
                                "socket": "localhost:10001",
                                "cert": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKVENDQWN5Z0F3SUJBZ0lRRnp5RTVhQTlRWFZIbE1sdFJHSVZ2ekFLQmdncWhrak9QUVFEQWpBeE1SOHcKSFFZRFZRUUtFeFpzYm1RZ1lYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmhiR2xqWlRBZQpGdzB5TWpFeU1UY3dPREE1TWpWYUZ3MHlOREF5TVRFd09EQTVNalZhTURFeEh6QWRCZ05WQkFvVEZteHVaQ0JoCmRYUnZaMlZ1WlhKaGRHVmtJR05sY25ReERqQU1CZ05WQkFNVEJXRnNhV05sTUZrd0V3WUhLb1pJemowQ0FRWUkKS29aSXpqMERBUWNEUWdBRUlEMDBYOWJvRnZTbWxzT2MvS1ZPNWFRbEtQYVh2K2RNZWE1NnVtTnhORVpRWWQvRwpuenJKN2tPUDliODNQaHBFbm9kMGpaeDV4c3hJdUhnMFBJSWJsYU9CeFRDQndqQU9CZ05WSFE4QkFmOEVCQU1DCkFxUXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUhBd0V3RHdZRFZSMFRBUUgvQkFVd0F3RUIvekFkQmdOVkhRNEUKRmdRVXhoMjF1RVdZdzdYM0ptVUNEcm02WVJYV3J0UXdhd1lEVlIwUkJHUXdZb0lGWVd4cFkyV0NDV3h2WTJGcwphRzl6ZElJRllXeHBZMldDRG5CdmJHRnlMVzR4TFdGc2FXTmxnZ1IxYm1sNGdncDFibWw0Y0dGamEyVjBnZ2RpCmRXWmpiMjV1aHdSL0FBQUJoeEFBQUFBQUFBQUFBQUFBQUFBQUFBQUJod1NzRXdBRE1Bb0dDQ3FHU000OUJBTUMKQTBjQU1FUUNJQjNPSHdnd1VqWjZJR2FicFZ3VnZCZDd4elVieUFha0dEc0VYTEtqdElMMUFpQWxQNk9ZVmQwQwp3RjA1TXlYK0VxdW5HaXlINnJVb3BtbndGSTIzVlA0cnJ3PT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
                                "admin": "AgEDbG5kAvgBAwoQMzwJtLo6lJQQH8H7YdIDjRIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYgvdxXw8WHIiWQ9xXY7Kd9k1ffXJ+ouQPX1Dg5AimCG9U=",
                                "invoice": "AgEDbG5kAlgDChAxPAm0ujqUlBAfwfth0gONEgEwGhYKB2FkZHJlc3MSBHJlYWQSBXdyaXRlGhcKCGludm9pY2VzEgRyZWFkEgV3cml0ZRoPCgdvbmNoYWluEgRyZWFkAAAGIMS5yID+NMsm46m3zDYbIQd3DIj2whIzTa7Vf93AfqFQ"
                            }, {
                                "nodetype": "bitcoind",
                                "network": "bitcoin",
                                "fungible": true,
                                "asset": "BTC",
                                "rpcuser": "bitcoind-regtest-rpcuser0",
                                "rpcpassword": "UFIeQGQOjGV6BVn6VmOhaqjbFLXFaXSgjqhOfK",
                                "rpcport": 20332
                            }]
                        },
                    }
                },
                seekerSubmarineSwapProps: {
                    uid: 'carol',
                    hash: null,
                    party: 'secretSeeker',
                    quantity: baseQuantity,
                    asset: 'BTC',
                    templateProps: {
                        "version": "v2",
                        "nodes": {
                            "submarine": [{
                                "nodetype": "lnd",
                                "network": "lightning.btc",
                                "fungible": true,
                                "asset": "BTC",
                                "socket": "localhost:10003",
                                "cert": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKakNDQWN5Z0F3SUJBZ0lRWmVaWDk4YThNaCtobGNGamI0ZFExakFLQmdncWhrak9QUVFEQWpBeE1SOHcKSFFZRFZRUUtFeFpzYm1RZ1lYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmpZWEp2YkRBZQpGdzB5TWpFeU1UY3dPREE1TWpWYUZ3MHlOREF5TVRFd09EQTVNalZhTURFeEh6QWRCZ05WQkFvVEZteHVaQ0JoCmRYUnZaMlZ1WlhKaGRHVmtJR05sY25ReERqQU1CZ05WQkFNVEJXTmhjbTlzTUZrd0V3WUhLb1pJemowQ0FRWUkKS29aSXpqMERBUWNEUWdBRVFhUW5HVWxPaUhTdERVMkx0ajBsMCszMVR0cm1LanZ3MnJ4eFgvQjBEVmZoazZUaApXOStBbnJLK3FxdlZwcWVFTFA5b0tobzlDOEZJanFMa3Z2ZHFMNk9CeFRDQndqQU9CZ05WSFE4QkFmOEVCQU1DCkFxUXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUhBd0V3RHdZRFZSMFRBUUgvQkFVd0F3RUIvekFkQmdOVkhRNEUKRmdRVTJvd2U5eFNFNW1peEw3SmpVZlp5QThwd09xQXdhd1lEVlIwUkJHUXdZb0lGWTJGeWIyeUNDV3h2WTJGcwphRzl6ZElJRlkyRnliMnlDRG5CdmJHRnlMVzR4TFdOaGNtOXNnZ1IxYm1sNGdncDFibWw0Y0dGamEyVjBnZ2RpCmRXWmpiMjV1aHdSL0FBQUJoeEFBQUFBQUFBQUFBQUFBQUFBQUFBQUJod1NzRXdBQ01Bb0dDQ3FHU000OUJBTUMKQTBnQU1FVUNJQ1RPaHhteHNGV0g5aU5NdHd1TzdUVVFkd2lQb1VPaUdLYXBXNmdIMGZ0bUFpRUF3OUk5QVlHVgpkRjVrcWVlT2tabzZKYlVLeFZ0T1JXKzJQNDRQaWgxN0JCdz0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
                                "admin": "AgEDbG5kAvgBAwoQklK3oUif17ijZUS8oA2YThIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYgQMtWE00/7racXYaFuZlIszNgz0v3UWJgxqq5qx4B370=",
                                "invoice": "AgEDbG5kAlgDChCQUrehSJ/XuKNlRLygDZhOEgEwGhYKB2FkZHJlc3MSBHJlYWQSBXdyaXRlGhcKCGludm9pY2VzEgRyZWFkEgV3cml0ZRoPCgdvbmNoYWluEgRyZWFkAAAGIMgmq9FBKcIGOq+v5dJJRELUcPred2dPqr0fFbIPZ4Um"
                            }, {
                                "nodetype": "bitcoind",
                                "network": "bitcoin",
                                "fungible": true,
                                "asset": "BTC",
                                "rpcuser": "bitcoind-regtest-rpcuser0",
                                "rpcpassword": "UFIeQGQOjGV6BVn6VmOhaqjbFLXFaXSgjqhOfK",
                                "rpcport": 20332
                            }],
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
                console.log(`${JSON.stringify(data)}`)
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
            <p><label>quantity: <input type='number' value={baseQuantity} onChange={(evt) => setBaseQuantity(evt.target.value)}/></label></p>
            {/*<p><label>Quote Quantity: <input type='number' value={quoteQuantity} onChange={(evt) => setQuoteQuantity(evt.target.value)}/></label></p>*/}

        </>
    );
}

export default SwapCreate;