import { useState, useCallback, useEffect } from 'react'


const storageName = 'userData'
export const useAuth = () => {
    const [token, setToken] = useState(null)
    // const [userId, setUserId] = useState(null)
    // const [userName,setUserName]=useState(null)

    const login = useCallback((jwtToken) => {
        setToken(jwtToken)
        // setUserId(id)
        // setUserName(name)

        localStorage.setItem(storageName, JSON.stringify({
             token:jwtToken
        }))

    }, [])
    const logout = useCallback(() => {
        setToken(null)
        // setUserId(null)
        // setUserName(null)
        localStorage.removeItem(storageName)
    }, [])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token);

        }
    }, [login])


    return { login, logout, token }
}