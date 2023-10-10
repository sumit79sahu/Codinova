import Products from "../layouts/Products"
import Sale from "../layouts/Sale"

export default function Home() {
    return (
        <>
            <div className="cntr">
                <Sale />
                <Products />
            </div>
        </>
    )
}
