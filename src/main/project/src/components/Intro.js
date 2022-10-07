export default function Intro() {
    return (
        <div className="introPage">
            <div className="inner">
                <div className="noticeBox">
                    <p><span>공지사항</span></p>
                    <div className="noticeList">
                        <div className="noticeEl">
                            <h1>학업용 프로젝트입니다</h1>
                            <h2>핵심 부분만 구현했기에 동작하지 않는 부분도 있습니다</h2>
                        </div>
                        <div className="noticeEl">
                            <h1>반응형 웹이 아닙니다</h1>
                            <h2>전체 화면에서 둘러봐주세요!</h2>
                        </div>
                        <div className="noticeEl">
                            <h1>사용한 기술입니다</h1>
                            <h2>React + SCSS + Spring + Oracle DB</h2>
                        </div>
                    </div>
                </div>
                <div className="recommendShop">
                    <ul className="recommendList">
                        <li>이벤트1</li>
                        <li>이벤트2</li>
                        <li>이벤트3</li>
                        <li>이벤트4</li>
                    </ul>
                    <div className="banner"></div>
                </div>
            </div>
        </div>
    )
}