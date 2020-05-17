import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
import { Result, Empty } from 'antd'
import Axios from 'axios'
import Paypal from '../../utils/Paypal'

function CartPage(props) {
    const dispatch = useDispatch()
    const [Total, setTotal] = useState(0)
    const [TotalRupiah, setTotalRupiah] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)
    const [TotalUSD, setTotalUSD] = useState(0)

    useEffect(() => {
        let cartItems = [];
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                dispatch(getCartItems(cartItems, props.user.userData.cart))
            }
        }
    }, [props.user.userData])

    useEffect(() => {
        if(props.user.cartDetail && props.user.cartDetail.length > 0) {
            calculateTotal(props.user.cartDetail)
        }
    }, [props.user.cartDetail])

    const calculateTotal = (cartDetail) => {
        cartDetail.map(item => {
            if (item.quantity !== undefined) {
                let total = 0;
                let totalUSD = 0;

                cartDetail.map(item => {
                    total += parseInt(item.price, 10) * item.quantity
                })

                totalUSD = Math.ceil(total/14280);

                setTotal(total)
                setTotalUSD(totalUSD)

                // change number to rupiah
                let reverse = total.toString().split('').reverse().join(''),
                    ribuan = reverse.match(/\d{1,3}/g);
                ribuan = ribuan.join('.').split('').reverse().join('');
                
                setTotalRupiah(ribuan)

                setShowTotal(true)
            }
        })
    }

    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId)).then(() => {
            Axios.get('/api/users/userCartInfo')
            .then(response => {
                if (response.data.success) {
                    if (response.data.cartDetail.length <= 0) {
                        setShowTotal(false)
                    } else {
                        calculateTotal(response.data.cartDetail)
                    }
                } else {
                    alert('Failed to get cart info')
                }
            })
        })
    }

    const transactionSuccess = (data) => {
        let variables = {
            cartDetail: props.user.cartDetail, paymentData: data
        }

        Axios.post('/api/users/successBuy', variables)
        .then(response => {
            if (response.data.success) {
                setShowSuccess(true)
                setShowTotal(false)

                dispatch(onSuccessBuy({
                    cart: response.data.cart,
                    cartDetail: response.data.cartDetail
                }))
            } else {
                alert('Failed to buy it')
            }
        })
    }

    const transactionError = () => {
        console.log('Paypal error')
    }

    const transactionCanceled = () => {
        console.log('Transaction canceled')
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
            <div>
                <UserCardBlock
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}/>

                {
                    ShowTotal ?
                        <div style={{ marginTop: '3rem' }}>
                            <h2>Total: Rp{TotalRupiah}</h2>
                        </div>
                    :
                        ShowSuccess ?
                            <Result status="success" title="Successfully Purchased Items" />
                        :
                            <div style={{ width:'100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <br/>
                                <Empty description={false}/>
                                <p>No Items in the cart</p>
                            </div>

                }

            </div>

            {ShowTotal &&
                <Paypal
                toPay={TotalUSD}
                onSuccess={transactionSuccess}
                transactionError={transactionError}
                transactionCanceled={transactionCanceled} />
            }
        </div>
    )
}

export default CartPage