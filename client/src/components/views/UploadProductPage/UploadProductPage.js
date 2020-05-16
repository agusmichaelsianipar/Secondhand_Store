import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage(props) {

    const [TitleValue, SetTitleValue] = useState("")
    const [DescriptionValue, SetDescriptionValue] = useState("")
    const [PriceValue, SetPriceValue] = useState(0)
    const [StockValue, SetStockValue] = useState(0)
    const [Images, SetImages] = useState([])
    const onTitleChange = (event) => {
        SetTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        SetDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        SetPriceValue(event.currentTarget.value)
    }

    const onStockChange = (event) => {
        SetStockValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        SetImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            stock: StockValue,
            price: PriceValue,
            images: Images
        }

        Axios.post('/api/product/uploadProduct', variables)
        .then(response => {
            if(response.data.success) {
                alert('Product Successfully Uploaded')
                props.history.push('/')
            } else {
                alert('Failed to upload Product')
            }
        })
    }

    return (
        <div style={{ maxwidth:'700px', marginTop:'5rem', marginLeft:'15rem', marginRight:'15rem', marginBottom:'5rem'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}> Upload Barang </Title>
            </div>

        <Form onSubmit={onSubmit} >
            {/* DropZOne */}
            <FileUpload refreshFunction={updateImages}/>

            <br />
            <br />
            <label>Judul :</label>
            <Input
                onChange={onTitleChange}
                value={TitleValue}
            />
            <br />
            <br />
            <label>Deskripsi :</label>
            <TextArea
                onChange={onDescriptionChange}
                value={DescriptionValue}
            />
            <br />
            <br />
            <label>Stok :</label>
            <Input
                onChange={onStockChange}
                value={StockValue}
                type="number"
            />
            <br />
            <br />
            <label>Harga (Rp) :</label>
            <Input
                onChange={onPriceChange}
                value={PriceValue}
                type="number"
            />

            <br />
            <br />
            <Button
                onClick={onSubmit}
            >
                Submit
            </Button>

        </Form>

        </div>
    )
}

export default UploadProductPage