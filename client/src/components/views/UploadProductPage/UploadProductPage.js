import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon} from 'antd';
import FileUpload from '../../utils/FileUpload'

const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage() {

    const [TitleValue, SetTitleValue] = useState("")
    const [DescriptionValue, SetDescriptionValue] = useState("")
    const [PriceValue, SetPriceValue] = useState(0)
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

    const updateImages = (newImages) => {
        SetImages(newImages)
    }

    return (
        <div style={{ maxwidth:'700px', margin:'5rem'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}> Upload Barang </Title>
            </div>

        <Form onSubmit >
            {/* DropZOne */}
            <FileUpload refreshFunction={updateImages}/>

            <br />
            <br />
            <label>Judul</label>
            <Input
                onChange={onTitleChange}
                value={TitleValue}
            />
            <br />
            <br />
            <label>Deskripsi</label>
            <TextArea
                onChange={onDescriptionChange}
                value={DescriptionValue}
            />
            <br />
            <br />
            <label>Harga (Rp)</label>
            <Input
                onChange={onPriceChange}
                value={PriceValue}
                type="number"
            />

            <Button
                onClick
            >
                Submit
            </Button>

        </Form>

        </div>
    )
}

export default UploadProductPage