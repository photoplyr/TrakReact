/**
 * Created by Nazimov Andrey.
 * Date: 7/17/18
 * Time: 3:36 PM
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import SvgUri from 'react-native-svg-uri';

export default class TrakPropGraphic extends React.Component {
    render() {
        return (
            <View style={{}}>

                <SvgUri source={require('../assets/images/trak_bar/trak_bar.svg')}/>
                <View style={styles.bar}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        bottom: 2,
        right: '14.8%',
        backgroundColor: '#fff',
        width: 20,
        height: '50%'
    }
})