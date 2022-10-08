import {useEffect, useState} from "react";

export default function Join(props) {
    const [joinActive, setJoinActive] = useState(false)

    useEffect(() => {
        joinActive ? document.querySelector('.btnJoin').classList.add('active') :
            document.querySelector('.btnJoin').classList.remove('active')
    }, [joinActive])

    return (<div className="joinPage">
            <div className="inner">
                <div className="joinText">
                    <h1>회원가입</h1>
                    <h2>별도의 개인정보를 입력받지는 않겠습니다.</h2>
                </div>
                <div className="joinInputBox" onKeyUp={(e) => {
                    const inputEls = document.querySelectorAll('.joinInputBox input')
                    inputEls[0].value === "" || inputEls[1].value === "" ? setJoinActive(false) : setJoinActive(true)
                    console.log(joinActive)
                }}>
                    <div className="inputEl">
                        <label className="inputMsg" htmlFor="inputId">아이디를 입력하세요</label>
                        <input type="text" id="inputId" onFocus={(e) => {
                            const labelId = document.querySelectorAll('.joinInputBox .inputMsg')[0]
                            labelId.classList.add('active')
                        }}
                               onBlur={(e) => {
                                   const labelId = document.querySelectorAll('.joinInputBox .inputMsg')[0]
                                   e.target.value === "" && labelId.classList.remove('active')
                               }}/>
                    </div>
                    <div className="inputEl">
                        <label className="inputMsg" htmlFor="inputPw">비밀번호를 입력하세요</label>
                        <input type="password" id="inputPw" onFocus={(e) => {
                            const labelPw = document.querySelectorAll('.joinInputBox .inputMsg')[1]
                            labelPw.classList.add('active')
                        }}
                               onBlur={(e) => {
                                   const labelPw = document.querySelectorAll('.joinInputBox .inputMsg')[1]
                                   e.target.value === "" && labelPw.classList.remove('active')
                               }}/>
                    </div>
                </div>
                <button className="btnJoin">회원가입</button>
            </div>
        </div>
    )
}