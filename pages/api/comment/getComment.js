import  clientPromise from "@/util/mongodb"
import { ObjectId } from "mongodb";

// 댓글작성 api
export default async function handler(request, response){
        console.log(request.query.parent)
        try {
            console.log(request.body)
            const db = (await clientPromise).db("forum");
            let result = await db.collection('comment').find({parent: new ObjectId(request.query.parent) }).toArray()
            console.log(result)
            response.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    
}