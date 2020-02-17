
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, ScrollView, Button } from 'react-native'
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { addToCart } from '../../store/actions/cart-action';
import CartLabel from '../../components/UI/CartLabel';
import showToast from '../../components/UI/toast';

const ProductDetailScreen = (props) => {
    const dispatch = useDispatch()
    const [wasAdded, setWasAdded] = useState(false)
    useEffect(() => {
        if (wasAdded) {
            showToast();
            setWasAdded(false)
        }
    }, [wasAdded])
    const productId = props.navigation.getParam('productId');
    const availableProducts = useSelector(state => state.productReducer.products);
    const selectedProduct = availableProducts.find(product => product.id === productId);
    const count = useSelector(state => {
        let counter = 0;
        for (const key in state.cartReducer.items) {
            counter += state.cartReducer.items[key].quantity;
        }
        return counter;
    });
    useEffect(() => {
        props.navigation.setParams({ cartItemCount: count })
    }, [count]);

    return <ScrollView>
        <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
        <View style={styles.actions}>
            <Button color={Colors.primaryColor} title='Add to cart' onPress={() => {
                dispatch(addToCart(selectedProduct));
                setWasAdded(true);
            }} />
        </View>
        <Text style={styles.price} >${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
}

ProductDetailScreen.navigationOptions = (navData) => {
    const onCartClicked = () => {
        navData.navigation.navigate('Cart')
    }
    const productTitle = navData.navigation.getParam('productTitle');
    const cartItemCount = navData.navigation.getParam('cartItemCount');
    return {
        headerTitle: productTitle,
        headerRight: <View style={styles.headerLeft}>
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={onCartClicked} />
            </HeaderButtons>
            <CartLabel cartItemCount={cartItemCount} onPress={onCartClicked} />
        </View>
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: Colors.priceColor,
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    headerLeft: {
        flexDirection: 'row'
    }
});


export default ProductDetailScreen;