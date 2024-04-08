'use client'

import { useEffect, useState } from "react"

export default function Comment(props){
    //console.log(JSON.parse(props.comments))
    let [comment, setComment] = useState('')
    let [data, setData] = useState([])

    useEffect(() => {
        fetch('/api/comment/getComment?parent='+props.parent)
        .then(r=>r.json())
        .then((result)=>{
            console.log(result)
            setData(result)
        })
    },[])

    return(
        <div>
            <div>댓글목록창</div>
            {
                data.length > 0 ?
                data.map((a,i)=>
                    <div key={i}>
                        <p>{a.content} / 작성자:{a.author}</p>
                    </div>
                )
                : '댓글없음'
            }

            <input type="text" onChange={(e)=>{
                setComment(e.target.value)
            }}/>
            <button onClick={()=>{
                console.log(comment)
                fetch('/api/comment/newComment', {
                    method : 'POST',
                    body : JSON.stringify({content: comment, parent : props.parent})})
                .then(response =>{
                    console.log(response)
                });
            }}>댓글전송</button>
        </div>
    )
}