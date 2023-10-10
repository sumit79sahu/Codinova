export default function ProductComponent({ data }) {
    return (
        <>

            <div className="product-name">
                <span >{data.name}</span>
            </div>

            <img src={data.image} alt="" className="product-img" />

            <div className="product-content">
                <span>Price: {data.price}</span>
                <p>{data.description}</p>

            </div>
        </>
    )
}