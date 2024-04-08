import  clientPromise from "@/util/mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(request, response){
    let session = await getServerSession(request, response, authOptions)
    //Optional Chaining 문법 ?앞의 객체가 null 또는 underfined인 경우 underfined를 반환처리해줌
    request.body.author = session?.user?.email
    
    if(request.method == 'POST'){
        if (request.body.title == ''){
            return response.status(500).json({error: 'title is required'})
        }
        console.log("글작성처리")
        try {
            const db = (await clientPromise).db("forum");
            let result = await db.collection('post').insertOne(request.body)
            return response.status(200).redirect('/list')            
        } catch (error) {
            console.log(error)
        }
    }
}