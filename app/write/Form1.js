'use client'

import { useState } from "react"

export default function DarkMode(){
    let [src, setSrc] = useState('')
    return (
        <form action="/api/post/new" method="POST">
            <input type="text" name="title" placeholder="제목"/>
            <input type="text" name="content" placeholder="내용"/>
            <button type="submit">작성</button>
            <input type="file" accept="image/*" onChange={
                async (e) => {
                let file = e.target.files[0]
                let filename = encodeURIComponent(file.name)
                let res = await fetch('/api/post/image?file=' + filename)
                res = await res.json()
                
                //S3 업로드
                const formData = new FormData()
                Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                    formData.append(key, value)
                })
                let 업로드결과 = await fetch(res.url, {
                    method: 'POST',
                    body: formData,
                })
                console.log(업로드결과)

                if (업로드결과.ok) {
                    setSrc(업로드결과.url + '/' + filename)
                } else {
                    console.log('실패')
                }
                
                }
            } />
            <img src={src} />
        </form>
    )
}