import  clientPromise from "@/util/mongodb"
import { ObjectId } from "mongodb";
import Comment from "./Comment"

// 상세보기
export default async function Detail(props) {
    const db = (await clientPromise).db("forum");
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params._id)})
    let comments = await db.collection('comment').findOne({parent: new ObjectId(props.params._id)})

    //console.log(comments)
    return (
      <div>
        <h4>상세페이지</h4>
        <h4>{result.title}</h4>
        <p>{result.content}</p>
        <Comment parent={props.params._id}></Comment>
      </div>
    );
  }