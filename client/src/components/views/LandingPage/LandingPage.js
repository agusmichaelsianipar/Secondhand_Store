import React, {useEffect,useState} from 'react'
import Axios from 'axios'
import { Icon, Col, Card, Row } from 'antd'
import ImageSlider from '../../utils/ImageSlider'

const {Meta} = Card

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit
        }
        
        getProduct(variables)
    }, [])

    const getProduct = (variables) => {
        Axios.post('/api/product/getProduct', variables).then(response => {
            if (response.data.success) {
                setProducts([...Products, ...response.data.products])

                setPostSize(response.data.postSize)

                console.log(response.data.products)
            } else {
                alert('Failed to fetch product datas')
            }
        })

    }

    const onLoadMore = ( ) => {
        let skip = Skip + Limit;
        
        const variables = {
            skip: skip,
            limit: Limit
        }

        getProduct(variables)

    }

    const renderCards = Products.map(( product, index ) => {

        // change number to rupiah
        let reverse = product.price.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        
        return <Col lg={6} md={8} xs={12} key={index}>
            <Card hoverable={true} cover={<ImageSlider images={product.images}/>}>
                <Meta title={product.title} description={`Rp${ribuan}`}>

                </Meta>
            </Card>
        </Col>
    })

    return ( 
        <div style={{ width: '75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center' }}>
                <h2> Let's Travel Anywhere <Icon type="rocket" /> </h2>
            </div>

            { /* Filter */}

            { /* Search */}

            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center'}}>
                    <h2> No post yet... </h2>
                </div> :
                <div>
                    <Row gutter={[16,16]}>
                        {renderCards}
                    </Row>
                </div>    
            }

            <br/><br/>

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}> Load More </button>
                </div>
            }

        </div>
    )
}

export default LandingPage