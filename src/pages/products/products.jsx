import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Item } from "../../components/item"
import { useCart } from "../../context/cart"
import dummyJsonApi from "../../services/dummyJsonApi"

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [query] = useSearchParams();
    const { addToCart } = useCart()

    const searchQuery = query.get('q');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const products = searchQuery ? await dummyJsonApi.fetchProductsBySearchQuery(searchQuery) : await dummyJsonApi.fetchAllProducts();
            setProducts(products);
            console.log('effect', products)
            setLoading(false)
        }
        fetchProducts().catch(console.error)
    }, [searchQuery])

    if (!loading && searchQuery && !products.length) {
        return (
            <div className="container">
                <div className="product py-2">
                    <div className="details p-3">No products found matching your query.</div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="container">
                <div className="products my-5">
                    <div className="grid">
                        {loading ? (
                            <div className="loader" />
                        ) : (
                            console.log('return', products),
                            products.products.map((product) => (
                                <Item key={product.id} data={product} addToCart={() => addToCart(product)} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products 