'use client' //클라이언트 컴포넌트로 선언

import Link from "next/link"

export default function ListItem(props){
    return (
        <div>
        { 
             props.result.map((a, i)=>
                 <div className="list-item" key={i}>
                    <Link href={'/detail/'+props.result[i]._id}>
                        <h4>{props.result[i].title}</h4>
                    </Link>
                    <Link href={'/edit/'+props.result[i]._id}>✏️</Link>
                    <span onClick={(e)=>{
                        fetch('/api/delete', {method: 'DELETE', body: JSON.stringify({_id: props.result[i]._id,
                        author: props.result[i].author})})
                        .then((r)=>{
                            if(r.status === 200){
                                e.target.parentElement.style.opacity = 0;
                                setTimeout(()=>{
                                    e.target.parentElement.style.display = 'none';
                                }, 1000);
                                return r.json()
                            } else{
                                // 에러코드전송시 코드
                            }
                        })
                        .then(()=>{
                            // 조건없이 실행할 코드
                        }).catch((error)=>{
                            console.log(error) //인터넷문제로 실패시
                        }); //차라리 axios 라이브러리를 쓰는게 좋겠다~
                        //fetch('/api/test?name=kim') 
                        //fetch('/api/abc/kim') //URL파라미터 문법
                    }}>🗑️</span>
                    <p>{props.result[i].content}</p> 
                 </div>
             )
        } 
        </div>
    )
}