import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, FlatList, Text, Button, Platform, Alert, ActivityIndicator } from 'react-native'
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButton';
import showToast from "../../components/UI/toast";
import { removeProductAction } from "../../store/actions/product-action";

function UserProductScreen(props) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const userProducts = useSelector(state => state.productReducer.userProducts);
    const [wasRemoved, setWasRemoved] = useState(false)

    useEffect(() => {
        if (wasRemoved) {
            showToast();
            setWasRemoved(false)
        }
    }, [wasRemoved])

    const onEditProduct = (productId) => {
        props.navigation.navigate('EditProduct', { productId });
    }
    const onDeleteProduct = (productId) => {
        Alert.alert('Delete!', 'Sure you want to delete this product?', [
            { text: 'No', style: 'default' }, {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(removeProductAction(productId))
                    setWasRemoved(true)
                }
            }
        ])
    }
    if (!isLoading && userProducts.length === 0) {
        return <View style={styles.centeredStyle}>
            <Text style={styles.noProducts}>No products to display. Please start adding some!</Text>
        </View>
    }
    return <FlatList data={userProducts}
        renderItem={(itemData) =>
            <ProductItem
                imageUrl={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => onEditProduct(itemData.item.id)}
                id={itemData.item.id}>
                <Button color={Colors.primaryColor} title='Edit'
                    onPress={() => onEditProduct(itemData.item.id)} />
                <Button color={Colors.primaryColor} title='Remove' onPress={() => {
                    onDeleteProduct(itemData.item.id)
                }} />
            </ProductItem>}
    />
}

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Products",
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Add' iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditProduct')
                }} buttonStyle={{ color: Platform.OS === 'android' ? 'white' : Colors.primaryColor }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
});


export default UserProductScreen;