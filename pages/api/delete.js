import clientPromise from "@/util/mongodb"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

// 글 삭제 메서드
export default async function handler(request, response){
    try {
        if(request.method == 'DELETE'){  
            let session = await getServerSession(request, response, authOptions)
            const body = request.body;
            // 작성자 본인이거나 마스터권한의 유저만 삭제가능
            if (JSON.parse(body).author != session?.user?.email && session?.user?.role != 'master'){
                console.log("삭제는 작성자 본인만 가능합니다")
                return response.status(400).json({error: '삭제는 작성자 본인만 가능합니다'})
            }

            if (body == null){
                return response.status(400).json({
                    error: "body is null"
                })
            }
            let tmp = JSON.parse(body);

            const db = (await clientPromise).db("forum");
            let result = await db.collection('post').deleteOne({_id: new ObjectId(tmp._id)}
            )
            console.log(result)
            return response.status(200).json('삭제완료')
        } 
    } catch (error) {
        console.log(error)
    }

}