import  clientPromise from "@/util/mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { ObjectId } from "mongodb";

// 댓글작성 api
export default async function handler(request, response){
    let session = await getServerSession(request, response, authOptions)
    let body = JSON.parse(request.body)
    body.author = session.user.email
    body.parent = new ObjectId(body.parent)
    
    if(request.method == 'POST'){
        if (request.body.comment == ''){
            return response.status(505).json({error: '댓글이 빈칸입니다'})
        }
        console.log("글작성처리")
        try {
            const db = (await clientPromise).db("forum");
            let result = await db.collection('comment').insertOne(body)
            return response.status(200).redirect('/list')            
        } catch (error) {
            console.log(error)
        }
    }
}