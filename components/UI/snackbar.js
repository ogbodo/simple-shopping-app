import { WSnackBar } from 'react-native-smart-tip'
import Colors from '../../constants/Colors';

const showSnackbar = (message, actionText, callback) => {
    const snackBarOpts = {
        data: message,
        position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
        duration: WSnackBar.duration.INDEFINITE, //1.SHORT 2.LONG 3.INDEFINITE
        textColor: 'white',
        backgroundColor: Colors.priceColor,
        actionText: callback ? actionText : '',
        actionTextColor: Colors.primaryColor,
        actionClick: callback,
    }

    WSnackBar.show(snackBarOpts)
}


export default showSnackbar;