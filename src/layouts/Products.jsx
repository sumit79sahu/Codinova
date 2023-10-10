import ProductComponent from "../components/Product.Component"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { add } from '../Store/Product/productSlice'

export default function Products() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    const fetchProduct = async () => {
        try {
            const result = await fetch('http://localhost:3001/products');
            const data = await result.json();
            setProducts(data);
            setLoading(false)
        } catch (error) {
            setError(true)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    if (loading) return (<h1>Loading</h1>)
    if (error) return (<h1>Something went wrong</h1>)

    return (
        <>
            <div className="screen2">

                <div className="products">
                    {
                        products.map((data, index) => (
                            <div key={index} onClick={() => { dispatch(add(data)) }}>
                                <ProductComponent data={data} />
                            </div>
                        ))
                    }
                </div>

            </div>
        </>
    )
}

