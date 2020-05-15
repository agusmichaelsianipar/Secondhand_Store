import React, { useEffect,useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card,Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

const {Meta} = Card;


function LandingPage() {

    const [Products,setProducts]=useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)

    useEffect(()=>{
        const variables = {
            skip: Skip, 
            limit: Limit
        }
        getProducts(variables)
    },[])

    const getProducts = (variables)=>{
        Axios.post('/api/product/getProducts',variables)
        .then(response => {
            if(response.data.success) {

                setProducts((response.data.products))

                setPostSize(response.data.postSize)

                console.log(response.data.products)

            }else{
                alert('Failed to Fetch Product Datas')
            }
        })        
    }

    const onLoadMore = ( )=>{
        let skip = Skip + Limit;
        const variables = {
            skip: skip, 
            limit: Limit
        }
        getProducts(variables)

        setSkip(skip)

    }

    const renderCards = Products.map((product, index)=>{

        return <Col lg={6} md={8} xs={24}>
                    <Card
                        hoverable = {true}
                        cover = {<ImageSlider images={product.images}/>}
                    >
                        <Meta
                            title = {product.title}
                            description={`Rp${product.price}`}
                        />
                    </Card>
                </Col>
    })

    return (
        <>
            <div style={{width:'75%', margin:'3rem auto'}}>
                <div style={{textAlign:'center'}}>
                    <h2>Let's Buy Any Secondhand's thing <Icon type="rocket" /></h2>
                </div>
                
                {/*Filter*/}

                {/*Search*/}


                {Products.length ===0 ?
                <div style={{display:'flex', height:'300px', justifyContent:'center',alignItems:'center'}}>
                    <h2>
                        No Post Yet..
                    </h2>
                </div> :
                <div>
                    <Row gutter={[16,16]}>
                        
                        {renderCards}
                    </Row>    
                </div>
            }
            <br/><br/>

            {PostSize >= Limit &&
                <div style={{display:'flex', justifyContent:'center'}}>
                    <button onClick={onLoadMore}>Load more ... </button>
                </div>                      
            }


            </div>
        </>
    )
}

export default LandingPage
