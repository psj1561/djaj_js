import clientPromise from "@/util/mongodb";
import bcrypt from 'bcrypt'

// 회원가입
export default async function handler(request, response){
    if(request.method == 'POST'){
        // 아이디, 패스워드 빈칸 확인
        if (request.body.email == '' || request.body.password == ''){
            return response.status(500).json({error: '아이디나 비번이 빈칸입니당'})
        }
        try {
            // 아이디 중복검사
            const db = (await clientPromise).db("forum");
            let isDu = await db.collection('user_cred').findOne({email : request.body.email})
            if (isDu){
                return response.status(500).json({error: '이미 존재하는 아이디입니다.'})
            }
            console.log("회원가입처리")
            // 비밀번호 암호화
            let hash = await bcrypt.hash(request.body.password, 10)
            request.body.password = hash
            
            // 일반사용자로 권한부여
            request.body.role = 'normal'
            let result = await db.collection('user_cred').insertOne(request.body)
            return response.status(200).redirect('/list')            
        } catch (error) {
            console.log(error)
        }
    }
}