import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productReducer from './store/reducers/product-reducer';
import cartReducer from './store/reducers/cart-reducer';
import ShopNavigator from './navigation/ShopNavigator'
import { AppLoading } from 'expo'
import * as Fonts from 'expo-font'
import { enableScreens } from 'react-native-screens'
// import { composeWithDevTools } from 'redux-devtools-extension'
import orderReducer from './store/reducers/order-reducer';

enableScreens(true);
const rootReducer = combineReducers({ productReducer, cartReducer, orderReducer })
// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Fonts.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}
const App = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  if (!isFontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setIsFontLoaded(true)} />;
  }
  return <Provider store={store}><ShopNavigator /></Provider>;
}

export default App;

