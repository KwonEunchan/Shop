import {useEffect, useState} from "react";
import Login from "./Login";
import {useNavigate} from "react-router-dom";

export default function Header(props) {
    const nav = useNavigate()
    return (
        <div className="header">
            <div className="userBar">
                <div className="inner">
                    <p className="logo">Shop</p>
                    <ul className="userMenu">
                        <li onClick={() => {
                            props.setLoginView(true)
                        }}>로그인
                        </li>
                        <li onClick={() => {
                            nav('./join')
                        }}>회원가입
                        </li>
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