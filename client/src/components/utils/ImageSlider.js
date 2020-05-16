import React from 'react'
import { Carousel } from 'antd'

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                { props.images.map(( image, index ) => (
                    <div key={index}>
                        <img style={{ paddingTop: '5px', paddingBottom: '5px', width: '50%', maxHeight: '150px', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src={`http://localhost:5000/${image}`} alt="productImage"/>
                    </div>
                )) }
            </Carousel>
        </div>
    )
}

export default ImageSlider
