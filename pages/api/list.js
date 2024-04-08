import  connectDB from "@/util/database"

// 글 리스트 불러오는 메서드
export default async function handler(request, response){
    if(request.method == 'GET'){
        console.log("DB데이터 로딩")
        const db = (await connectDB.connectDB).db("forum");
        let result = await db.collection('post').find().toArray();

        return response.status(200).json(result)
    }
    if(request.method == 'POST'){
        console.log("글작성")
        let result = request.body

        return response.status(200).json(result)
    }
}