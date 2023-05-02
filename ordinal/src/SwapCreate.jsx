import { useState } from "react";

import {Buffer} from 'buffer';


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
                            "submarine": [{
                                "nodetype": "lnd",
                                "network": "lightning.btc",
                                "fungible": true,
                                "asset": "BTC",
                                "socket": "localhost:10001",
                                "cert": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKVENDQWN5Z0F3SUJBZ0lRVUVQM1VWWDRPZE1uQVNJWnlVN0pVakFLQmdncWhrak9QUVFEQWpBeE1SOHcKSFFZRFZRUUtFeFpzYm1RZ1lYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmhiR2xqWlRBZQpGdzB5TXpBek1qTXdOalV3TWpoYUZ3MHlOREExTVRjd05qVXdNamhhTURFeEh6QWRCZ05WQkFvVEZteHVaQ0JoCmRYUnZaMlZ1WlhKaGRHVmtJR05sY25ReERqQU1CZ05WQkFNVEJXRnNhV05sTUZrd0V3WUhLb1pJemowQ0FRWUkKS29aSXpqMERBUWNEUWdBRUlma1VLUjg2cy8wcE9CYVdseVYveFFnVndhekFJZ2FFVG1Sd2RENmVkaW1zSEF6ZQp2SGEwVDhpVk85YmhjblhSelFnbXhOcEVsUnczbmYrYzNyR2grYU9CeFRDQndqQU9CZ05WSFE4QkFmOEVCQU1DCkFxUXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUhBd0V3RHdZRFZSMFRBUUgvQkFVd0F3RUIvekFkQmdOVkhRNEUKRmdRVUNGdFVmREE0TE1QMXdnWWo4MHdxMk1mTXdtY3dhd1lEVlIwUkJHUXdZb0lGWVd4cFkyV0NDV3h2WTJGcwphRzl6ZElJRllXeHBZMldDRG5CdmJHRnlMVzQxTFdGc2FXTmxnZ1IxYm1sNGdncDFibWw0Y0dGamEyVjBnZ2RpCmRXWmpiMjV1aHdSL0FBQUJoeEFBQUFBQUFBQUFBQUFBQUFBQUFBQUJod1NzRXdBRU1Bb0dDQ3FHU000OUJBTUMKQTBjQU1FUUNJRE5zSjVxcWFtUjF1c1c4UDJjbDNFYkNuczI2bThzTDkxVjdPc0UxQ3A3WEFpQThHRnVFbHp6VgoxTGZTeTU3T1V1c2x3Uit4MGh4WERwejQvUGtRa1YzUWl3PT0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
                                "admin": "AgEDbG5kAvgBAwoQAnegiXuBJ1BO3DBOoAVPKxIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYggI55BnXLAxIiluYilBTo5cVNAmvT3Po0GlHbKn3dqcs=",
                                "invoice": "AgEDbG5kAlgDChAAd6CJe4EnUE7cME6gBU8rEgEwGhYKB2FkZHJlc3MSBHJlYWQSBXdyaXRlGhcKCGludm9pY2VzEgRyZWFkEgV3cml0ZRoPCgdvbmNoYWluEgRyZWFkAAAGIDhgv/OZsjkE+c9eCxhq8EMoE+ZOMNIaFj2/ke/h+t9V"
                            }, {
                                "nodetype": "bitcoind",
                                "network": "bitcoin",
                                "fungible": true,
                                "asset": "BTC",
                                "rpcuser": "seaweed",
                                "rpcpassword": "MvA9gIkqZEcSlKtBSrKRRs9GjzbX90oHM1I2vz",
                                "rpcport": 8332,
                                "wif": "KzZdHCyFbFfT5NTsFwwJLwYn2kRJtxwSdt7i1SXrb5hXauRgXWmM",
                            }]
                        },
                    }
                },
                seekerSubmarineSwapProps: {
                    uid: 'carol',
                    hash: null,
                    party: 'secretSeeker',
                    quantity: baseQuantity,
                    fee: 0,
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
                                "cert": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKekNDQWN5Z0F3SUJBZ0lRWXB3SVpDOHQzMGNlTVZqNGNBc2FUVEFLQmdncWhrak9QUVFEQWpBeE1SOHcKSFFZRFZRUUtFeFpzYm1RZ1lYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmpZWEp2YkRBZQpGdzB5TXpBek1qTXdOalV3TWpoYUZ3MHlOREExTVRjd05qVXdNamhhTURFeEh6QWRCZ05WQkFvVEZteHVaQ0JoCmRYUnZaMlZ1WlhKaGRHVmtJR05sY25ReERqQU1CZ05WQkFNVEJXTmhjbTlzTUZrd0V3WUhLb1pJemowQ0FRWUkKS29aSXpqMERBUWNEUWdBRThFU1VKYTQrdjZ0SWpxM0o3SUp3bjMzNXhKU0lkRVByVThFbk9vUXRONXJDMlE5bwpQOEQzaFZjK1MzVS9Md3BDQVRNSm1vTjUvK09KQjBacjJsMEROS09CeFRDQndqQU9CZ05WSFE4QkFmOEVCQU1DCkFxUXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUhBd0V3RHdZRFZSMFRBUUgvQkFVd0F3RUIvekFkQmdOVkhRNEUKRmdRVXFpTlpPVGI5NENES1o4RUlvSlEwQ3MwL21ESXdhd1lEVlIwUkJHUXdZb0lGWTJGeWIyeUNDV3h2WTJGcwphRzl6ZElJRlkyRnliMnlDRG5CdmJHRnlMVzQxTFdOaGNtOXNnZ1IxYm1sNGdncDFibWw0Y0dGamEyVjBnZ2RpCmRXWmpiMjV1aHdSL0FBQUJoeEFBQUFBQUFBQUFBQUFBQUFBQUFBQUJod1NzRXdBRE1Bb0dDQ3FHU000OUJBTUMKQTBrQU1FWUNJUUNKYkN4TXU1TDRmK2sxTVQwY04xVFhmbjNFZlErZmI4Kyt0VXlScUN5K09BSWhBUEdOZFB6Sgp3REZpa0psaFBGeGk3QzRhbllkRGJJY3hBOUkzSC9VNkFPZ1cKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
                                "admin": "AgEDbG5kAvgBAwoQ7vyuKt4cBcy2CNd4b+0FtBIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYg+WX2z1DLjVM2rWqiKQoejpQCcgIM38jk8mRZ5zGv3Dk=",
                                "invoice": "AgEDbG5kAlgDChDs/K4q3hwFzLYI13hv7QW0EgEwGhYKB2FkZHJlc3MSBHJlYWQSBXdyaXRlGhcKCGludm9pY2VzEgRyZWFkEgV3cml0ZRoPCgdvbmNoYWluEgRyZWFkAAAGIBV5RaF6ReUVvUd83omtikDO+lVHFR+jIFcrV1SYfWGJ"
                            }, {
                                "nodetype": "bitcoind",
                                "network": "bitcoin",
                                "fungible": true,
                                "asset": "BTC",
                                "rpcuser": "seaweed",
                                "rpcpassword": "MvA9gIkqZEcSlKtBSrKRRs9GjzbX90oHM1I2vz",
                                "rpcport": 8332,
                                "wif": "L4uvZ8zdKPpiA1E1wtFBS3MZCgdcKWUDGbSquUHxsmPkNSTWHfKr"
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