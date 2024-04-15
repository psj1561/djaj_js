
export default async function Write2(){

    // 같은 파일에서 api없이 내용 받는법
    async function handleSubmit(formData){
        'use server'
        const db = (await db).db('forum')
        db.collection('post_test').insertOne({title: formData.get('title')})
        console.log(formData.get('title'))
    }

    return(
        <div>
            <form action={handleSubmit}>
                <input name="title" type="text" />
                <button type="submit">버튼</button>
            </form>
        </div>
    )
}