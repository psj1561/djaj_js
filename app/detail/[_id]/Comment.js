'use client'

import { useEffect, useState } from "react"

export default function Comment(props){
    let [comment, setComment] = useState('')
    let [data, setData] = useState([])
    let [good, setGood] = useState(0)

    // 댓글, 좋아요 변화시 댓글목록 다시 랜더링
    useEffect(() => {
        fetch('/api/comment/getComment?parent='+props.parent)
        .then(r=>r.json())
        .then((result)=>{
            setData(result)
        })
    },[comment, good])

    return(
        <div>
            <div>댓글목록창</div>
            {
                data.length > 0 ?
                data.map((a,i)=>
                    <div key={i}>
                        <p>{a.content} / 작성자:{a.author}</p>
                        <button onClick={()=>{
                            fetch('/api/comment/joayo',{
                                method : 'POST',
                                body : JSON.stringify({commentId : a._id})})
                            .then((response)=>{
                                let tmp = good
                                tmp++
                                setGood(tmp)
                            })
                            }}>&#128077; {a.joayo}개
                        </button>
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
                    setComment('')
                });
            }}>댓글전송</button>
        </div>
    )
}