import {useEffect, useState} from "react";
import Login from "./Login";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

export default function Header(props) {
    const nav = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies()
    return (
        <div className="header">
            <div className="userBar">
                <div className="inner">
                    <p className="logo">Shop</p>
                    <ul className="userMenu">
                        {
                            ( cookies.id === null || cookies.id === undefined || cookies.id === "")  ?
                                <>
                                    <li onClick={() => {
                                        props.setLoginView(true)
                                    }}>로그인
                                    </li>
                                    <li onClick={() => {
                                        nav('./join')
                                    }}>회원가입
                                    </li>
                                </> :
                                <li className="logon">
                                    <div onClick={() => {
                                        const userTab = document.querySelector('.userTab')
                                        userTab.classList.add('active')
                                    }}>
                                    <p>{cookies.id + "님, 환영합니다"}</p>
                                    <span className="material-symbols-outlined icon">arrow_drop_down_circle</span>
                                    </div>
                                    <ul className="userTab">
                                        <li onClick={()=>{
                                            const cart = document.querySelector('.cart')
                                            cart.classList.add('active')

                                        }}>장바구니</li>
                                        <li onClick={()=>{
                                            removeCookie('id')
                                        }}>로그아웃</li>
                                        <li onClick={() => {
                                            const userTab = document.querySelector('.userTab')
                                            userTab.classList.remove('active')
                                        }}>창 닫기
                                        </li>
                                    </ul>
                                </li>
                        }
                    </ul>
                </div>
            </div>
            <div className="menuBar">
                <div className="inner">
                    <ul className="menuList">
                        <li>Best</li>
                        <li>신상품</li>
                        <li>이벤트</li>
                    </ul>
                    <div className="searchBox">
                        <input type="text" placeholder="찾으시는 상품을 검색하세요" onKeyUp={(e) => {
                            const btnSearch = document.querySelector('.searchBox>button')
                            e.target.value != "" ? btnSearch.classList.add('active') :
                                btnSearch.classList.remove('active')
                        }}/>
                        <button>검색</button>
                    </div>
                </div>
            </div>
        </div>
    )
}