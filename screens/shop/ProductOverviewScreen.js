import React, { useEffect } from 'react'
import { FlatList, Platform, View,  StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { addToCart } from '../../store/actions/cart-action';
import { loadProductAction } from '../../store/actions/product-action';
import PRODUCTS from '../../data/dummy-data';
import CartLabel from '../../components/UI/CartLabel';


const ProductOverviewScreen = (props) => {
    const dispatch = useDispatch();

    const availableProducts = useSelector(state => state.productReducer.availableProducts);
    const count = useSelector(state => {
        let counter = 0;
        for (const key in state.cartReducer.items) {
            counter += state.cartReducer.items[key].quantity;
        }
        return counter;
    });
    useEffect(() => {
        dispatch(loadProductAction(PRODUCTS))
    }, [PRODUCTS]);

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
    return <FlatList data={availableProducts} renderItem={(itemData) => <ProductItem
        imageUrl={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={onViewDetails.bind(this, itemData)}
        onAddToCart={() => {
            dispatch(addToCart(itemData.item))
        }}
    />} />;
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
    labelContainer: {
        backgroundColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        marginRight: 20,
        marginLeft: - 16,
        height: '70%',
        alignSelf: 'baseline',
        borderRadius: 40

    },
    label: {
        color: Platform.OS === 'ios' ? 'white' : Colors.primaryColor,
        fontFamily: 'open-sans-bold',

    }
})

export default ProductOverviewScreen;