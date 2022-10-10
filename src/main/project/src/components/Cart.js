import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import axios from "axios";

export default function Cart(){
    const [cartItem,setCartItem] = useState([])
    const [cookies] = useCookies()

    useEffect(()=>{
        axios({
            method: 'get',
            url: '/getcart',
            params: {
                'id' : cookies.id
            }
        }).then((res)=>{
            setCartItem(res.data)
            console.log(res.data)
        })
    },[])


    return(
        <div className="cart">
            <div className="inner">
                <div className="cartHeader">
                    <p>장바구니</p>
                </div>
                <div className="cartBody">
                    {
                        cartItem.map((cart)=>{
                            return(
                                <div className="cartEl">1</div>
                            )
                        })
                    }
                </div>
                <div className="cartFooter">
                    <button className="btnBuy btn">구 매</button>
                    <button className="btnClose btn" onClick={()=>{
                        document.querySelector('.cart').classList.remove('active')
                    }}>닫 기</button>
                </div>
            </div>
        </div>
    )
}