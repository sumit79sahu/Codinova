import { useDispatch } from "react-redux"
import { remove,counter} from "../Store/Product/productSlice"
import { useEffect, useState } from "react"
export default function SaleCardComponent({product})
{
    const dispatch=useDispatch()
    const [count,setCount]=useState(0)
    const Increment=()=>
    {
        dispatch(counter({...product,count:count+1}))
    }
    const Decrement=()=>{
        if(count>1)
            dispatch(counter({...product,count:count-1}))
    }
    useEffect(()=>{setCount(product.count)},[product])
    return(
        <>
        <div className="sale-card">
            <span className="remove" onClick={()=>{dispatch(remove(product.name))}}>&#x2716;</span>
            <span>{product.name}</span>
            <span>{product.price}</span>
            <span className="counter">
                <span onClick={Increment}>+</span>
                <span>{count}</span>
                <span onClick={Decrement}>-</span>
            </span>
            <span>{product.price*count} INR</span>
        </div>
        </>
    )
}