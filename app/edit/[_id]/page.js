import connectDB from "@/util/database"
import { ObjectId } from "mongodb";

//수정
export default async function Edit(props) {
    const db = (await connectDB.connectDB).db("forum");
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params._id)}) //수정할 글데이터 받아오기
   
    return (
      <div className="p-20">
          <h1>글 수정</h1>
          <form action="/api/post/edit" method="POST">
              <input type="hidden" name="_id" defaultValue={result._id.toString()} />
              <input type="hidden" name="author" defaultValue={result.author} />
              <input type="text" name="title" defaultValue={result.title}/>
              <input type="text" name="content" defaultValue={result.content}/>
              <button type="submit">수정완료</button>
          </form>
      </div>
    );
  }