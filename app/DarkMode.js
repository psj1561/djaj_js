'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DarkMode({res}){
    let router = useRouter()
    
    // useEffect(()=>{
    //     let cookieValue = ('; '+document.cookie).split(`; mode=`).pop().split(';')[0]
    //     if(cookieValue == ''){
    //         document.cookie = 'mode=light; max-age=' +(3600 * 24 * 400)
    //     }
    // },[])

  return (
    <span onClick={()=>{
        console.log(res.value)
        if (res.value == 'light'){
            document.cookie = 'mode=dark; max-age=' +(3600 * 24 * 400)
        }else{
            document.cookie = 'mode=light; max-age=' +(3600 * 24 * 400)
        }     
        router.refresh()
    }}>
        {res.value === 'light'?'☀️' : '🌙'}
    </span>
  )
}