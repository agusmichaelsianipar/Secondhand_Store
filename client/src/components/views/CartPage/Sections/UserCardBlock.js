import React from 'react'

function UserCardBlock(props) {

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Gambar</th>
                        <th>Banyak Barang</th>
                        <th>Harga Barang</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.products && props.products.map(product => (
                            <tr key={product._id}>
                                <td>
                                    <img style={{ width: '70px' }} alt="product"
                                    src={renderCartImage(product.images)}/>
                                </td>
                                <td>{product.quantity}</td>
                                <td>Rp {product.price}</td>
                                <td><button onClick={() => props.removeItem(product._id)}>Hapus</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
