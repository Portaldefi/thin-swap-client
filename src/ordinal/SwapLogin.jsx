import Client from '../client/v2/client.js'
import { signIn, signOut } from '../store/userSlice.js'
import { useAppDispatch, useAppSelector } from '../store/hooks.js'
import { useEffect } from "react";

const hostname = window.location.hostname
const port = window.location.port


function SwapLogin({participant}) {

    const dispatch = useAppDispatch()

    console.log(`participant in Login: ${JSON.stringify(participant)}`)

    const client = new Client({ id: `${participant.username}`, hostname, port })

    const user = useAppSelector(state => state.user)
    const doLogin = () => {
        dispatch(signIn(client))
    }

    const doLogout = () => {
        dispatch(signOut(client))
    }

    useEffect(() => {
        console.log("users", user)
    }, [user])


    // useEffect(() => {
    //     console.log('useEffect {user}', { user })
    //     if (user.isLoggedIn) {
    //         try {
    //             console.log('user', user)
    //             const connected = user.user.connect()
    //         } catch (error) {
    //             console.warn(`sorry an error occurred, due to ${error.message} `)
    //             // logOut();
    //         }
    //     }
    //     return () => {
    //         if (user.isLoggedIn) user.user.disconnect()
    //         console.log('useEffect cleanup')
    //     }
    // }, [user])


    return (
        <>
            <button onClick={doLogin}>Login {participant.username}</button>
            <button onClick={doLogout}>Logout {participant.username}</button>
        </>
    );
}


export default SwapLogin;