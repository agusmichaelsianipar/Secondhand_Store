import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { addToCart } from '../../../_actions/user_actions'
import { useDispatch } from 'react-redux'

function DetailProductPage(props) {
    const productId = props.match.params.productId
    const [Product, setProduct] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })

    }, [])

    const onAddCart = (productId) => {
        dispatch(addToCart(productId))
    }

    return (
        <div className="postPage" style={{padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <div style={{ width:'75%', paddingLeft:'10rem'}}>
                    <Col lg={12} xs={24}>
                        <ProductImage detail={Product} />
                    </Col>
                </div>
                <Col lg={12} xs={24}>
                    <ProductInfo addToCart={onAddCart} detail={Product} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage
