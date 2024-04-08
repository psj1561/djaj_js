'use client'

import { usePathname, useRouter } from "next/navigation"

export default function DetailLink(){
    let router = useRouter()
    //let a = usePathname() // 현재 URL주소
    return(
        <button onClick={()=>{
            router.push('/')
        }}>버튼</button>
    )
}