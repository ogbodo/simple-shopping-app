
import React, { useEffect } from 'react'
import { View, StyleSheet, Text, Image, ScrollView, Button } from 'react-native'
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import { addToCart } from '../../store/actions/cart-action';

const ProductDetailScreen = (props) => {
    const dispatch = useDispatch()

    const productId = props.navigation.getParam('productId');
    const availableProducts = useSelector(state => state.productReducer.availableProducts);
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
                dispatch(addToCart(selectedProduct))
            }} />
        </View>
        <Text style={styles.price} >${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
}

ProductDetailScreen.navigationOptions = (navData) => {
    const productTitle = navData.navigation.getParam('productTitle');
    const cartItemCount = navData.navigation.getParam('cartItemCount');
    return {
        headerTitle: productTitle,
        headerRight: <View style={styles.headerLeft}>
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
                    navData.navigation.navigate('Cart')
                }} />
            </HeaderButtons>
            <Text style={styles.label}>{cartItemCount}</Text>
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
    },
    label: {
        color: Colors.accentColor,
        fontFamily: 'open-sans-bold',
        marginRight: 20,
        marginLeft: - 16,
        alignSelf: 'baseline'
    }
});


export default ProductDetailScreen;