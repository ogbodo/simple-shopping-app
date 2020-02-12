import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import Colors from '../constants/Colors'
import { Platform } from 'react-native'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const productsNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    productDetail: ProductDetailScreen
}, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
        }
    });

export default createAppContainer(productsNavigator);