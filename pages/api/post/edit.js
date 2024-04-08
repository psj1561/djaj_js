import clientPromise from "@/util/mongodb"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

// 글 수정 메서드
export default async function handler(request, response, next){
    if(request.method == 'POST'){
        let session = await getServerSession(request, response, authOptions)
        const body = request.body;
        // 작성자 본인이거나 마스터권한인 유저만 수정가능하도록
        if (body.author != session?.user?.email && session?.user?.role != 'master'){
            console.log("수정은 작성자 본인만 가능합니다")
            return response.status(400).json({error: '수정은 작성자 본인만 가능합니다'})
        }

        // 제목과 내용이 비어있으면 에러코드 return
        if (request.body.title == '' || request.body.content == ''){
            return response.status(500).json({error: '부정확한 입력'})
        }
        console.log("글 수정처리")
        try {
            const db = (await clientPromise).db("forum");
            // DB에 원하는 id의 데이터에 덮어씌우기
            let result = await db.collection('post').updateOne(
                {_id: new ObjectId(request.body._id)},
                {$set: {title : request.body.title, content :request.body.content}}
                // {$inc: {}} 더하기도 가능
            )
            // 정상적으로 처리후 /list로 페이지이동
            return response.status(200).redirect('/list')            
        } catch (error) {
            console.log(error)
        }
    }
}