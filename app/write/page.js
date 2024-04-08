import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// 글 등록 페이지
export default async function Write(){
    // autoO 로그인 정보 받아오기
    let session = await getServerSession(authOptions)
    if(session)
    {
        return(
            <div className="p-20">
                <h1>글작성</h1>
                <form action="/api/post/new" method="POST">
                    <input type="text" name="title" placeholder="제목"/>
                    <input type="text" name="content" placeholder="내용"/>
                    <button type="submit">작성</button>
                </form>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1>글작성은 로그인후 가능합니다</h1>
            </div>
        )
    }
}