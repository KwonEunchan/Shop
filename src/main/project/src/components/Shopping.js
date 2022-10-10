import {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

export default function Shopping() {
    const categories = ['전체', '인기', '생활용품', '뷰티', '스포츠', '도서', '식품']
    const [categoryPtr, setCategoryPtr] = useState(0)
    const [pagePtr, setPagePtr] = useState(0)
    const [itemCodes, setItemCodes] = useState([])
    const [items, setItems] = useState([])
    const [nowItems, setNowItems] = useState([])
    const [pageNav,setPageNav] = useState([])
    const [cookies] = useCookies()

    useEffect(() => {
        const categoryEls = document.querySelectorAll('.shopHeader>ul>li')
        categoryEls.forEach((categoryEl, index) => {
            index === categoryPtr ? categoryEl.classList.add('active') :
                categoryEl.classList.remove('active')
        })
        axios({
            method: 'get',
            url: '/item',
            params: {
                'category': categories[categoryPtr]
            }
        }).then((res) => {
            setItemCodes(res.data.split(","))
        })
    }, [categoryPtr])

    useEffect(()=>{
        axios({
            method: 'get',
            url: '/iteminfo',
            params: {
                'codes': itemCodes.join(",")
            }
        }).then((res) => {
            setItems(res.data)
        })
    },[itemCodes])

    useEffect(()=>{
        const copy = []
        for(let i=1;i<=Math.ceil(items.length/8);i++){
            copy.push(i)
        }
        setPageNav([...copy])

        const copy2 = []
        for(let i = pagePtr;i<=pagePtr+7;i++){
            if(items[i]!==undefined){
                copy2.push(items[i])
            }
        }
        setNowItems([...copy2])
    },[items])


    useEffect(() => {
        const pageEls = document.querySelectorAll('.shopFooter>li')
        pageEls.forEach((pageEl, index) => {
            index === pagePtr ? pageEl.classList.add('active') :
                pageEl.classList.remove('active')
        })

        const copy2 = []
        for(let i = pagePtr*8;i<=pagePtr*8+7;i++){
            if(items[i]!==undefined){
                copy2.push(items[i])
            }
        }
        setNowItems([...copy2])
    }, [pagePtr])


    return (
        <div className="shop">
            <div className="inner">
                <div className="shopHeader">
                    <p>상품목록</p>
                    <ul>
                        {
                            categories.map((category, index) => {
                                return (<li onClick={() => {
                                    setCategoryPtr(index)
                                }}>{category}</li>)
                            })
                        }
                    </ul>
                </div>
                <div className="shopBody">
                    {
                        nowItems.map((item,index)=> {
                                return (
                                    <div className="productEl" key={index}>
                                        <div className="productImage" style={{
                                            "backgroundImage" : `url(../images/items/${item.code}.png)`
                                        }}></div>
                                        <div className="productName">
                                            <h1>{item.name}</h1>
                                            <div className="productInfo">
                                                <p>{item.info}</p>
                                                <p>{item.price}원</p>
                                                <div className="productBtnBox">
                                                    <button className="btnBuy">구매</button>
                                                    <button className="btnWish" onClick={()=>{
                                                        axios({
                                                            method: 'get',
                                                            url: '/incart',
                                                            params:{
                                                                id: cookies.id,
                                                                code: item.code
                                                            }
                                                        }).then((res)=>{
                                                            console.log(res.data)
                                                        })
                                                    }} >찜</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                        })
                    }
                </div>
                <ul className="shopFooter">
                    {
                        pageNav.map((el, index) => {
                            return (<li onClick={() => {
                                setPagePtr(index)
                            }} key={index}>{el}</li>)
                        })
                    }
                </ul>
            </div>
        </div>
    )
}