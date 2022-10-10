import {useEffect, useState} from "react";
import Join from "./Join";
import axios from "axios";
import {useCookies} from "react-cookie";

export default function Login(props) {
    const [loginActive, setLoginActive] = useState(false)
    const [cookies,setCookie] = useCookies()

    useEffect(() => {
        loginActive ? document.querySelector('.btnLogin').classList.add('active') : document.querySelector('.btnLogin').classList.remove('active')
    }, [loginActive])

    return (<div className="loginPage">
        <form action="" className="loginForm">
            <div className="inner">
                <h1>로그인</h1>
                <div className="loginInputBox" onKeyUp={(e) => {
                    const inputEls = document.querySelectorAll('.loginInputBox input')
                    inputEls[0].value === "" || inputEls[1].value === "" ? setLoginActive(false) : setLoginActive(true)
                }}>
                    <div className="inputEl">
                        <label className="inputMsg" for="inputId">아이디를 입력하세요</label>
                        <input type="text" id="inputId" onFocus={(e) => {
                            const labelId = document.querySelectorAll('.loginInputBox .inputMsg')[0]
                            labelId.classList.add('active')
                        }}
                               onBlur={(e) => {
                                   const labelId = document.querySelectorAll('.loginInputBox .inputMsg')[0]
                                   e.target.value === "" && labelId.classList.remove('active')
                               }}/>
                    </div>
                    <div className="inputEl">
                        <label className="inputMsg" for="inputPw">비밀번호를 입력하세요</label>
                        <input type="password" id="inputPw" onFocus={(e) => {
                            const labelPw = document.querySelectorAll('.loginInputBox .inputMsg')[1]
                            labelPw.classList.add('active')
                        }}
                               onBlur={(e) => {
                                   const labelPw = document.querySelectorAll('.loginInputBox .inputMsg')[1]
                                   e.target.value === "" && labelPw.classList.remove('active')

                               }}/>
                    </div>
                </div>
                <div className="btnBox">
                    <div className="btnLogin btn" onClick={(e)=>{
                        const req = {
                            "id" : document.querySelector('.loginInputBox #inputId').value,
                            "pw" : document.querySelector('.loginInputBox #inputPw').value
                        }
                        axios.post("/login", req).then((res)=>{
                            if(res.data != ""){
                                setCookie('id',res.data)
                                props.setLoginView(false)
                            }
                            else{
                                alert("로그인 정보를 확인해주세요!")
                            }
                        })
                    }}>로그인</div>
                    <div className="btnJoin btn">회원가입</div>
                </div>
                <div className="material-symbols-outlined btnClose" onClick={() => {
                    props.setLoginView(false)
                }}>close
                </div>
            </div>
        </form>
    </div>)
}