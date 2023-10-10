import { useEffect, useState } from "react"
export default function BillComponent({ billData,discount, vat, onHandleDiscount, onHandleVAT }) {
    const { subTotal, items } = billData

    useEffect(() => {
        if (subTotal === 0) {
            onHandleDiscount(0)
            onHandleVAT(0)
        }

    }, [billData])
    return (
        <>
            <div className="sale-bill">
                <div className="bill-headings">
                    <span >SubTotal</span>
                    <span>VAT tax</span>
                    <span>Discount</span>
                    <span>Total</span>
                </div>
                <div className="bill-values">
                    <div className="values">
                        <span>{subTotal} INR</span>
                        <span>{items} Items</span>
                    </div>
                    <div className="values">
                        <span> <input disabled={subTotal === 0 ? true : false} type="number" className="percentageInput" name="percentage" min="0" max="100" step="0.01" placeholder="0" onChange={(e) => onHandleVAT(e.target.value)} value={vat} />%</span>
                        <span>{(subTotal * vat) / 100} INR</span>
                    </div>
                    <div className="values">
                        <span><input disabled={subTotal === 0 ? true : false} type="number" className="percentageInput" name="percentage" min="0" max="100" step="0.01" placeholder="0" onChange={(e) => onHandleDiscount(e.target.value)} value={discount} />%</span>
                        <span>{(subTotal * discount) / 100} INR</span>
                    </div>
                    <span>{subTotal + ((subTotal * vat) / 100) + ((subTotal * discount) / 100)} INR</span>
                </div>
            </div>
        </>
    )
}