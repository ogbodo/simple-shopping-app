import React, { useState } from 'react'
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/Colors';

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orderReducer.orders);
    const [isLoading, setIsLoading] = useState(false)

    if (!isLoading && orders.length === 0) {
        return <View style={styles.centeredStyle}>
            <Text style={styles.noProducts}>No orders to display. Please start adding some!</Text>
        </View>
    }

    return <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => <View>
            <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.date}
                items={itemData.item.items}
            />
        </View>} />
}

OrdersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
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
export default OrdersScreen;