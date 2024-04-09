import  clientPromise from "@/util/mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { ObjectId } from "mongodb";

// 댓글 좋아요 
export default async function handler(request, response){
    let session = await getServerSession(request, response, authOptions)
    let body = JSON.parse(request.body)

    if(!session){
        console.log('비로그인상태')
        return response.status(400).json({error: '비로그인상태입니다.'})
    }

    body.myId = session.user.email
    body.commentId = new ObjectId(body.commentId)

    if(request.method == 'POST'){
        try {
            const db = (await clientPromise).db("forum");
            if (await db.collection('joayo').find({commentId: body.commentId, myId: session.user.email}).count()>0){
                console.log("ㅈ중복")
                return response.status(500).json({error: '이미 코멘트가 존재합니다.'})
            }
            let result = await db.collection('joayo').insertOne(body)
            console.log("따봉~")
            response.status(200).json(result)        
        } catch (error) {
            console.log(error)
        }
    }
}