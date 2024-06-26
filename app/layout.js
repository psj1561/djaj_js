import { Inter} from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

import LoginBtn from "./loginbutton"
import LogOutBtn from "./logoutbutton"
import Darkmode from "./darkMode"
import Navi from "./navi"
import { cookies } from "next/headers";

// 부트스트랩
import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App", 
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  // autoO 로그인 정보 받아오기
  let session = await getServerSession(authOptions)

  // cookie값 가져오기
  let res = cookies().get('mode')
  return (
    <html lang="en">
        <body className={
          res != undefined && res.value == 'dark' ? 'dark-mode' : ''}>
        <Navi res={res} session={session}></Navi>
        {/* <div className="navbar">
          <Link href="/" className="logo">Appleforum</Link>
          <Link href="/list">List</Link>
          <Link href="/write">Write</Link>
          {// 로그인, 로그아웃상태에 따라 상태창 변경
            session? 
            <span>{session.user?.name}님 <LogOutBtn></LogOutBtn></span>
            : <LoginBtn /> 
          }
          <Darkmode res={res}></Darkmode>
        </div> */}
          {children}
        </body>
    </html> 
  );
}
