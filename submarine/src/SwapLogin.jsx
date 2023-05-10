import Client from './client/v2/client.js'
import { signIn, signOut } from './store/userSlice.js'
import { useAppDispatch, useAppSelector } from './store/hooks.js'
import { useState, useEffect } from "react";

const hostname = window.location.hostname
const port = window.location.port

const dispatch = useAppDispatch

function SwapLogin({participant}) {
    const [login, setLogin] = useState(false)
    const [logout, setLogout] = useState(false)

    console.log(`participant in Login: ${JSON.stringify(participant)}`)

    const client = new Client({ id: `${participant.username}`, hostname, port })

    const user = useAppSelector(state => state.user)
    const doLogin = () => {
        setLogin(true)
    }

    const doLogout = () => {
        setLogout(true)
    }

    useEffect(() => {
        if (login) {
            console.log('useEffect {login}', {login})
            dispatch(signIn(client))
            setLogin(false)
        }
        else if (logout) {
            console.log('useEffect {login}', {login})
            dispatch(signOut(client))
            setLogout(false)

        }
        return () => {

        }
    }, [login, logout])


    return (
        <>
            <p><button onClick={doLogin}>Login {participant.username}</button></p>
            <p><button onClick={doLogout}>Logout {participant.username}</button></p>
        </>
    );
}


export default SwapLogin;