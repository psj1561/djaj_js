import connectDB from "@/util/database"
import DetailLink from "./DetailLink"
import ListItem from "./ListItem"

export const revalidate = 20 // 20초에 캐싱 한번실시

//export const dynamic = 'force-dynamic' //dynamic rendering 방식으로 강제 변경

// 리스트 페이지(server 컴포넌트)
export default async function List() {
    const db  = (await connectDB.connectDB).db("forum")
    let result = await db.collection('post').find().toArray()
    result = result.map((a: any)=>{
      a._id = a._id.toString()
      return a
    })

    return (
      <div className="list-bg">
        <ListItem result={result}/>
      </div>
    )
  } 