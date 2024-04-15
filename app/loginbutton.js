'use client'

import {signIn} from 'next-auth/react'

import Button from 'react-bootstrap/Button';

export default function LoginBtn(){
    return(
        <Button onClick={()=>{signIn()}} variant="secondary">LogIn</Button>
    )
}