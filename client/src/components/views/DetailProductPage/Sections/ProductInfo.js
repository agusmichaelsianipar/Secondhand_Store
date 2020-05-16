import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

function ProductInfo(props) {

    const [Product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])

    return (
        <div>
            <Descriptions title="Produk Info">
                <Descriptions.Item label="Harga"> {Product.price}</Descriptions.Item>
                <Descriptions.Item label="Stok">{Product.stock}</Descriptions.Item>
                <br />
                <Descriptions.Item label="Deskripsi"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button>
                    Add to Cart
                    </Button>
            </div>
        </div>
    )
}

export default ProductInfo
