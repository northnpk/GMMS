import { useEffect, useState } from "react"
import { useCookies } from 'react-cookie';
import { useRouter } from "next/router";
import Loading from "../Components/Loading";

const MyApp = () => {

    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(() => {
        if (cookies.user && cookies.user.User_ID) {
            removeCookie('user');
        } else {
            router.push('/')
        }
    }, [cookies.user])

    return (
        <Loading open={true} />
    )
}

MyApp.displayName = "MyApp"

export default MyApp;