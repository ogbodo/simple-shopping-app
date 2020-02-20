import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, Platform, View, StyleSheet, Text, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { addToCart } from '../../store/actions/cart-action';
import CartLabel from '../../components/UI/CartLabel';
import showToast from '../../components/UI/toast';
import Colors from '../../constants/Colors';
import { fetchProductsAction } from '../../store/actions/product-action';
import showSnackbar from '../../components/UI/snackbar';


const ProductOverviewScreen = (props) => {
    const dispatch = useDispatch();
    const [wasAdded, setWasAdded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    useEffect(() => {
        if (wasAdded) {
            showToast();
            setWasAdded(false)
        }
    }, [wasAdded])
    const availableProducts = useSelector(state => state.productReducer.products);
    const count = useSelector(state => {
        let counter = 0;
        for (const key in state.cartReducer.items) {
            counter += state.cartReducer.items[key].quantity;
        }
        return counter;
    });
    const loadProducts = useCallback(async () => {
        setIsLoading(true)
        try {
            await dispatch(fetchProductsAction())
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        loadProducts();
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            showSnackbar(error, 'Retry!', onRetryAgain);
        }
    }, [error]);

    useEffect(() => {
        props.navigation.setParams({ cartItemCount: count })
    }, [count]);

    const onViewDetails = (itemData) => {
        props.navigation.navigate('ProductDetail',
            {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
                cartItemCount: count
            })
    }
    const onRetryAgain = () => {
        console.log("RETRIED!");
    }


    if (isLoading) {
        return <View style={styles.centeredStyle}>
            <ActivityIndicator size='large' color={Colors.primaryColor} />
        </View>
    }

    if (!isLoading && availableProducts.length === 0) {
        return <View style={styles.centeredStyle}>
            <Text style={styles.noProducts}>No products to display yet!</Text>
        </View>
    }
    return <FlatList data={availableProducts}
        renderItem={(itemData) =>
            <ProductItem
                imageUrl={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={onViewDetails.bind(this, itemData)}
                id={itemData.item.id}>
                <Button color={Colors.primaryColor} title='View Details' onPress={onViewDetails.bind(this, itemData)} />
                <Button color={Colors.primaryColor} title='Add To Cart' onPress={() => {
                    dispatch(addToCart(itemData.item));
                    setWasAdded(true)
                }} />
            </ProductItem>}
    />

}

ProductOverviewScreen.navigationOptions = (navData) => {
    const onCartClicked = () => {
        navData.navigation.navigate('Cart')
    }
    const cartItemCount = navData.navigation.getParam('cartItemCount')
    return {
        headerTitle: ' All Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>,
        headerRight: <View style={styles.headerLeft}>
            <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={onCartClicked} />
            </HeaderButtons>
            <CartLabel cartItemCount={cartItemCount} onPress={onCartClicked} />
        </View>
    }
}

const styles = StyleSheet.create({
    headerLeft: {
        flexDirection: 'row'
    },
    noProducts: {
        textAlign: 'center',
        fontFamily: 'open-sans',
        color: Colors.priceColor
    },
    centeredStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    }
})

export default ProductOverviewScreen;