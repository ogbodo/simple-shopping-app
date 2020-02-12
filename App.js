import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productReducer from './store/reducers/productReducer';
import ShopNavigator from './navigation/ShopNavigator'

const rootReducer = combineReducers({ productReducer })
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

