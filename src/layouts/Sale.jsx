import SaleCardComponent from "../components/SaleCard.Component"
import BillComponent from "../components/Bill.Component"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { clear } from "../Store/Product/productSlice"
import ModalComponent from "../components/Modal.component"
export default function Sale() {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todayDate,] = useState(new Date())
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const close = () => {
        dispatch(clear([])); closeModal();
    }

    const products = useSelector((state) => state.product)
    const [billData, setBillData] = useState({ subTotal: 0, items: 0 })
    const [vat, setVAT] = useState(0)
    const [discount, setDiscount] = useState(0)

    const onHandleVAT = (per) => {
        setVAT(per)
    }
    const onHandleDiscount = (per) => {
        setDiscount(per)
    }

    const dispatch = useDispatch();

    const subTotal = () => {

        const t = products.reduce((accumalator, data) => {
            accumalator = accumalator + (data.price * data.count)
            return accumalator
        }, 0)
        const i = products.reduce((accumalator, data) => accumalator + data.count, 0)
        setBillData({ subTotal: t, items: i })

    }
    useEffect(() => {
        if (products.length !== 0)
            subTotal()
        else
            setBillData({ subTotal: 0, items: 0 })
    }, [products])
    return (
        <>
            {/*_________________________________________________________________ Modal_______________________________________ */}
            <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
                {
                    products.length === 0 ? <h1>There is no product</h1> : (
                        <>
                            <div className="modal-head">
                                <h1 className="modal-heading">Reciept</h1>
                            </div>
                            <div className="modal-sub-head">
                                <h2>Sale No 010</h2>
                                <h3>Date:{todayDate.toLocaleString()}</h3>
                            </div>


                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Products</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    products.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{data.name}</td>
                                                <td>{data.count}</td>
                                                <td>{data.count * data.price}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>

                            <div className="modal-bill">
                                <div className="fields">
                                    <div className="values field-values">
                                        <span>Total Items</span>
                                        <span>{billData.items}</span>
                                    </div>
                                    <div className="values field-values">
                                        <span>SubTotal</span>
                                        <span>{billData.subTotal}</span>
                                    </div>

                                    <div className="values field-values">
                                        <span>VAT</span>
                                        <span>{vat}</span>
                                    </div>
                                    <div className="values field-values">
                                        <span>Discount</span>
                                        <span>{discount}</span>
                                    </div>
                                    <div className="values field-values">
                                        <span>Total</span>
                                        <span>{billData.subTotal + ((billData.subTotal * vat) / 100) + ((billData.subTotal * discount) / 100)}</span>
                                    </div>
                                </div>
                                <button className="modal-btn" onClick={close}>Close</button>
                            </div>

                        </>
                    )
                }
            </ModalComponent >
            {/* _________________________________________________________________Left Screen_________________________________________________________ */}
            < div className="screen1" >
                <div className="headings">
                    <span></span>
                    <span>PRODUCTS</span>
                    <span>PRICE</span>
                    <span>QUANTITY</span>
                    <span>TOTAL</span>
                </div>

                <div className="cards">
                    {
                        products.length === 0
                            ?
                            <div className="empty-container">THERE ARE NO PRODUCTS</div>
                            :
                            products.map((product, index) => <SaleCardComponent product={product} key={index} />)
                    }

                </div>

                <BillComponent billData={billData} discount={discount} vat={vat} onHandleDiscount={onHandleDiscount} onHandleVAT={onHandleVAT} />

                <div className="sale-btn">
                    <button className="btn cancel-btn" onClick={() => dispatch(clear([]))}>CANCEL SALE</button>
                    <button className="btn process-btn" onClick={openModal}>PROCESS SALE</button>
                </div>
            </div >
        </>
    )
}