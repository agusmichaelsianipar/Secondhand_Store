import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd'
import Axios from 'axios'

function ProductInfo(props) {

    const [Product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    const onAddCart = () => {
        // Axios.put('/api/product/updateProducts/'+Product._id).then(response => {
        //     if (response.data.success) {
        //         alert('BERHASIL')
        //     } else {
        //         alert('GAGAL')
        //     }
        // })

        props.addToCart(props.detail._id)

    }

    return (
        <div>
            <Descriptions title="Produk Info">
                <Descriptions.Item label="Harga"> {Product.price}</Descriptions.Item>
                <Descriptions.Item label="Stok">{Product.stock}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                <br />
                <Descriptions.Item label="Deskripsi"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="primary" onClick={onAddCart}>
                    Add to Cart
                    </Button>
            </div>
        </div>
    )
}

export default ProductInfo
