import  clientPromise from "@/util/mongodb"
import { ObjectId } from "mongodb";

// 댓글불러오기
export default async function handler(request, response){
        try {
            const db = (await clientPromise).db("forum");
            let result = await db.collection('comment').find({parent: new ObjectId(request.query.parent) }).toArray()
            
            for (let i = 0; i < result.length; i++){
                result[i].joayo = await db.collection('joayo').find({commentId: result[i]._id}).count()
            }
            response.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
}