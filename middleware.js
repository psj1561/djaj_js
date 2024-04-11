import { getToken } from "next-auth/jwt"
import {NextResponse} from "next/server"

export async function middleware(request){

    // console.log(request.nextUrl)
    // console.log(request.cookies)
    // console.log(request.headers)
    // NextResponse.next() // 통과
    // NextResponse.redirect() // 다른페이지로 강제이동
    // NextResponse.rewrite() // 다른페이지로 이동 (URL은 유지)

    //console.log(request.nextUrl.pathname)

    const session = await getToken ({req : request})
    
    // 로그인상태가 아닌데 글작성 페이지로 이동시
    if (request.nextUrl.pathname.startsWith('/write')){
        if(session == null){
            return NextResponse.redirect('http://localhost:3000/api/auth/singin')
        }
    }

    if (request.nextUrl.pathname.startsWith('/list')){
        //console.log(new Date())
        //console.log(request.headers.get('sec-ch-ua-platform'))
        return NextResponse.next()
    }

    request.cookies.get('쿠키이름')  //출력
    request.cookies.has('쿠키이름')  //존재확인
    request.cookies.delete('쿠키이름')  //삭제

    
    if (!request.cookies.has('mode')){
        const response = NextResponse.next()
        response.cookies.set({
            name: 'mode',
            value: 'dark',
            maxAge: 5400,
            httpOnly : false // true면 다크모드 전환이 안되요 ㅠㅠ
          })
        return response
    }

    if (request.nextUrl.pathname.startsWith('/register')){
        const response = NextResponse.next()
        if (!request.cookies.has('visited')){
            response.cookies.set({
                name: 'visited',
                value: 'true',
                maxAge: 5400,
                httpOnly : true
              })
            return response
        }
    }
    
    return NextResponse.next()
}