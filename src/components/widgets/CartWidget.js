import React, { useContext, useState, useEffect, useRef } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Context } from "../../context/Context";
import { CartContext } from '../../context/CartContext';
import { CartForm } from "../../components/wholesale/forms/catalog/CartForm";
import Iconify from '../../components/widgets/Iconify/Iconify';
import getElement from '../../config/axios';

const StyledRoot = styled('div')(({ theme }) => ({
    zIndex: 999,
    right: 0,
    display: 'flex',
    cursor: 'pointer',
    position: 'fixed',
    alignItems: 'center',
    top: theme.spacing(16),
    height: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1.25),
    color: theme.palette.text.primary,
    backgroundColor: '#f7b81a',  // Cambiar color de fondo
    borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
    borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',  // Sombra más sutil
    transition: theme.transitions.create(['opacity', 'background-color'], {
        duration: theme.transitions.duration.shorter,
    }),
}));

const StyledCartContent = styled(Card)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100%',
    maxWidth: '500px',
    height: '100%',
    backgroundColor: '#f8f9fa',  // Color de fondo más claro
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',  // Sombra más pronunciada
    padding: theme.spacing(3),  // Aumentar padding
    overflowY: 'auto',
    borderTopLeftRadius: theme.spacing(2),
    borderBottomLeftRadius: theme.spacing(2),
}));


const CloseButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1000,
    padding: theme.spacing(0.5),
    minWidth: 'auto',
}));

const CartWidget = () => {
    const { cart, removeFromCart, updateProductInCart } = useContext(CartContext);  // Extraer removeFromCart del contexto
    const [openCart, setOpenCart] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const cartRef = useRef(null);
    const navigate = useNavigate();
    const [auth] = useContext(Context);

    // Función para formatear los precios
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

    const fetchDiscountPercentage = async () => {
        try {
            const response = await getElement.get(`wholesale/benefit/list/store/${auth.store_id}`);
            if (response.data && response.data.rows[0].all_variants_value) {
                setDiscountPercentage(response.data.rows[0].all_variants_value / 100);
            }
        } catch (error) {
            console.error("Error al obtener el porcentaje de descuento:", error);
        }
    };

    useEffect(() => {
        fetchDiscountPercentage();
    }, []);

    const handleCartToggle = () => {
        setOpenCart(!openCart);
    };

    const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
            setOpenCart(false);
        }
    };

    useEffect(() => {
        if (openCart) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openCart]);

    const totalAmount = cart.reduce((total, item) =>
        total + (item.selectedVariant.adjusted_price * item.selectedVariant.quantity), 0
    );

    const shouldShowDiscount = (option1) => {
        const relatedItems = cart.filter(item => item.selectedVariant.option1 === option1);
        const uniqueOptions2 = [...new Set(relatedItems.map(item => item.selectedVariant.option2))];
        return uniqueOptions2.length === 2;
    };

    const totalDiscount = cart.reduce((total, item) => {
        if (shouldShowDiscount(item.selectedVariant.option1)) {
            return total + (item.selectedVariant.adjusted_price * item.selectedVariant.quantity * discountPercentage);
        }
        return total;
    }, 0);

    const finalTotal = totalAmount - totalDiscount;

    // Función para eliminar un producto del carrito
    const handleRemoveItem = (productId) => {
        removeFromCart(productId);  // Usar removeFromCart en lugar de setCart
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            const existingProduct = cart.find(item => item.selectedVariant.id === productId);
            if (existingProduct) {
                const updatedProduct = {
                    ...existingProduct,
                    selectedVariant: {
                        ...existingProduct.selectedVariant,
                        quantity: newQuantity,
                    }
                };
                updateProductInCart(updatedProduct);
            }
        }
    };

    return (
        <StyledRoot onClick={() => !openCart && handleCartToggle()}>
            {!openCart && (
                <Badge showZero badgeContent={cart.length} color="error" max={99}>
                    <FontAwesomeIcon icon={faShoppingCart} width={24} height={24} onClick={handleCartToggle} style={{ color: 'white' }} />
                </Badge>
            )}

            {openCart && (
                <StyledCartContent ref={cartRef}>
                    <CloseButton variant="light" onClick={handleCartToggle}>
                        <Iconify icon="eva:close-fill" width={24} height={24} />
                    </CloseButton>
                    <Card border="light" className="bg-white shadow-sm mb-4">
                        <Card.Body>
                            <h5 className='mb-2'>Carrito</h5>
                            {cart.length === 0 ? (
                                <h5>El carrito está vacío.</h5>
                            ) : (
                                <>
                                    {cart.map((item, index) => {
                                        const itemTotal = item.selectedVariant.adjusted_price * item.selectedVariant.quantity;

                                        return (
                                            <Box key={index} sx={{ mb: 2 }}>
                                                <h5 className='mb-2'>{item.name} - {item.selectedVariant.option1} - {item.selectedVariant.option2}</h5>
                                                <h6 className='mb-2' style={{ color: '#4A5073' }}>
                                                    Cantidad:
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={item.selectedVariant.quantity}
                                                        onChange={(e) => handleQuantityChange(item.selectedVariant.id, parseInt(e.target.value) || 0)}
                                                        onBlur={(e) => {
                                                            const value = parseInt(e.target.value);
                                                            if (isNaN(value)) {
                                                                handleQuantityChange(item.selectedVariant.id, 1);
                                                            }
                                                        }}
                                                        className="d-inline-block ml-2"
                                                        style={{ width: '60px', marginLeft: '10px' }}
                                                    />
                                                </h6>
                                                <h6 className='mb-2' style={{ color: '#4A5073' }}>{formatter.format(itemTotal)}</h6>
                                                {shouldShowDiscount(item.selectedVariant.option1) && (
                                                    <h6 className='mb-2' style={{ color: 'red' }}>
                                                        Descuento aplicado por beneficio: {formatter.format(itemTotal * discountPercentage)}
                                                    </h6>
                                                )}
                                                <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                                                    Eliminar
                                                </Button>
                                            </Box>
                                        );
                                    })}
                                    <h5 className="mb-2">Subtotal: {formatter.format(totalAmount)}</h5>
                                    <h5 className="mb-2">Descuento total: {formatter.format(totalDiscount)}</h5>
                                    <h5 className="mb-2">Total final: {formatter.format(finalTotal)}</h5>
                                    <CartForm />
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </StyledCartContent>
            )}
        </StyledRoot>
    );
};

export default CartWidget;
