import React from 'react'
import { WToast } from 'react-native-smart-tip'
import { Image } from 'react-native';
import Colors from '../../constants/Colors';

const showToast = () => {
    const toastOpts = {
        data: 'Success',
        textColor: 'white',
        backgroundColor: Colors.priceColor,
        duration: WToast.duration.SHORT, //1.SHORT 2.LONG
        position: WToast.position.TOP, // 1.TOP 2.CENTER 3.BOTTOM
        icon: <Image source={require('../../assets/images/check-image.png')} style={{ width: 32, height: 32, resizeMode: 'contain' }} />
    }

    WToast.show(toastOpts)
}


export default showToast;