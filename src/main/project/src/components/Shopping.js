import {useEffect, useState} from "react";

export  default function Shopping(){
    const categories = ['전체','인기','생활용품','뷰티','스포츠','도서','식품']
    const [categoryPtr,setCategoryPtr] = useState(0)
    const [pagePtr,setPagePtr] = useState(0)

    useEffect(()=>{
        const categoryEls = document.querySelectorAll('.shopHeader>ul>li')
        categoryEls.forEach((categoryEl,index)=>{
            index === categoryPtr ? categoryEl.classList.add('active') :
                categoryEl.classList.remove('active')
        })
    },[categoryPtr])

    useEffect(()=>{
        const pageEls = document.querySelectorAll('.shopFooter>li')
        pageEls.forEach((pageEl,index)=>{
            index === pagePtr ? pageEl.classList.add('active') :
                pageEl.classList.remove('active')
        })
        console.log(pagePtr)
    },[pagePtr])


    return(
        <div className="shop">
            <div className="inner">
                <div className="shopHeader">
                    <p>상품목록</p>
                    <ul>
                        {
                            categories.map((category,index)=>{
                                return(<li onClick={()=>{
                                    setCategoryPtr(index)
                                }}>{category}</li>)
                        })
                        }
                    </ul>
                </div>
                <div className="shopBody">
                    <div className="productEl">
                        <div className="productImage"></div>
                        <div className="productName">
                            <h1>상품이름</h1>
                            <div className="productInfo">
                                <p>상품에 대한 설명입니다</p>
                                <p>90,000원</p>
                                <div className="productBtnBox">
                                    <button className="btnBuy">구매</button>
                                    <button className="btnWish">찜</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="productEl"></div>
                    <div className="productEl"></div>
                    <div className="productEl"></div>
                    <div className="productEl"></div>
                    <div className="productEl"></div>
                    <div className="productEl"></div>
                    <div className="productEl"></div>
                </div>
                <ul className="shopFooter">
                    {
                        [1,2,3,4].map((el,index)=>{
                            return(<li onClick={()=>{
                                setPagePtr(index)
                            }}>{el}</li>)
                        })
                    }
                </ul>
            </div>

        </div>
    )
}