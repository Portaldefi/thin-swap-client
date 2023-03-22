import { useState } from "react";

import {Buffer} from 'buffer';


function SwapCreate({setSwapId, setSwapHash, setSecretSeekerId, setSecretHolderId, setSecret}) {
    const [baseQuantity, setBaseQuantity] = useState(50000)
    const [quoteQuantity, setQuoteQuantity] = useState(50000)


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
                                "network": "lightning",
                                "fungible": true,
                                "asset": "BTC",
                                "socket": "localhost:10001",
                                "cert": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKekNDQWN5Z0F3SUJBZ0lRYjY4Um5LUUZxMUxDaFB0TFZXSXRrekFLQmdncWhrak9QUVFEQWpBeE1SOHcKSFFZRFZRUUtFeFpzYm1RZ1lYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmhiR2xqWlRBZQpGdzB5TXpBek1ERXdOVFUxTURWYUZ3MHlOREEwTWpVd05UVTFNRFZhTURFeEh6QWRCZ05WQkFvVEZteHVaQ0JoCmRYUnZaMlZ1WlhKaGRHVmtJR05sY25ReERqQU1CZ05WQkFNVEJXRnNhV05sTUZrd0V3WUhLb1pJemowQ0FRWUkKS29aSXpqMERBUWNEUWdBRVB4ZGQ0NXFBQ1dYblZaRVJ6OHR1UHkzUTZUbnkxazZZd1dML0NwRkk2Y3VDVjVGUwo4TXZQRHlJQjZaRnVRQ1pnT1NrNlBaQXJMV2VLZ3F0OVdoelJ5cU9CeFRDQndqQU9CZ05WSFE4QkFmOEVCQU1DCkFxUXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUhBd0V3RHdZRFZSMFRBUUgvQkFVd0F3RUIvekFkQmdOVkhRNEUKRmdRVVVINzNBMWFybjBTa05zMUFxQjlFVzJSUkt2c3dhd1lEVlIwUkJHUXdZb0lGWVd4cFkyV0NDV3h2WTJGcwphRzl6ZElJRllXeHBZMldDRG5CdmJHRnlMVzQwTFdGc2FXTmxnZ1IxYm1sNGdncDFibWw0Y0dGamEyVjBnZ2RpCmRXWmpiMjV1aHdSL0FBQUJoeEFBQUFBQUFBQUFBQUFBQUFBQUFBQUJod1NzRXdBQ01Bb0dDQ3FHU000OUJBTUMKQTBrQU1FWUNJUURFS2JiSW9VQkp3ZzljdThjelc4alBMZXJpZklSS3MvUWFEQXNLRndqdjRRSWhBUDA1WmtWWgpWWGpwaGVOWDRRVzB0Vm5mTXdxbzZnM0NlZDZsWUxSeXNuN1UKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
                                "admin": "AgEDbG5kAvgBAwoQNE2Aa/CUlX94ecZNbRnHTxIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYgJVfaIBLpb7I6NyGHB5/c0Km5iQUS+zsB6DT1rLkxwUI=",
                                "invoice": "AgEDbG5kAlgDChAyTYBr8JSVf3h5xk1tGcdPEgEwGhYKB2FkZHJlc3MSBHJlYWQSBXdyaXRlGhcKCGludm9pY2VzEgRyZWFkEgV3cml0ZRoPCgdvbmNoYWluEgRyZWFkAAAGIIbXb05hbtr+uz+a6Fy2WJUlSG3TIqDblUAMs6Gma3d8"
                            }, {
                                "nodetype": "bitcoind",
                                "network": "bitcoin",
                                "fungible": true,
                                "asset": "BTC",
                                "rpcuser": "",
                                "rpcpassword": "",
                                "rpcport": 8332
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
                                "network": "lightning",
                                "fungible": true,
                                "asset": "BTC",
                                "socket": "localhost:<port>",
                                "cert": "",
                                "admin": "",
                                "invoice": ""
                            }, {
                                "nodetype": "bitcoind",
                                "network": "bitcoin",
                                "fungible": true,
                                "asset": "BTC",
                                "rpcuser": "",
                                "rpcpassword": "",
                                "rpcport": 8332
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
                console.log(data.swap.id)
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
            <p><label>Base Quantity: <input type='number' value={baseQuantity} onChange={(evt) => setBaseQuantity(evt.target.value)}/></label></p>
            <p><label>Quote Quantity: <input type='number' value={quoteQuantity} onChange={(evt) => setQuoteQuantity(evt.target.value)}/></label></p>

        </>
    );
}

export default SwapCreate;