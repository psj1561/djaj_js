'use client'

import {signOut} from 'next-auth/react'

import Button from 'react-bootstrap/Button';

export default function LogOutBtn(){
    return(
        
        <Button onClick={()=>{signOut()}} variant="secondary" className='ms-4'>LogOut</Button>
        
    )
}