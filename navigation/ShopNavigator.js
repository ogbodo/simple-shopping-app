import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colors'
import { Platform } from 'react-native'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { Ionicons } from '@expo/vector-icons'
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import PayWithPaystack from '../components/UI/Paystack';

const defaultNavOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        }
    }
}
const productsNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
        navigationOptions: {
            drawerIcon: (drawerConfig) =>
                <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    size={23} color={Colors.primaryColor} />
        },
        ...defaultNavOptions
    });

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
    Paystack: PayWithPaystack
}, {
        navigationOptions: {
            drawerIcon: (drawerConfig) =>
                <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                    size={23} color={Colors.primaryColor} />
        },
        ...defaultNavOptions
    });

const AdminNavigator = createStackNavigator({
    Admin: UserProductScreen,
    EditProduct: EditProductScreen
}, {
        navigationOptions: {
            drawerIcon: (drawerConfig) =>
                <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    size={23} color={Colors.primaryColor} />
        },
        ...defaultNavOptions
    });

const ShopDrawerNavigator = createDrawerNavigator({
    Products: productsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
        navigationOptions: {
            activeTintColor: Colors.primaryColor
        }
    })
export default createAppContainer(ShopDrawerNavigator);