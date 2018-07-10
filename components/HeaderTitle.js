/**
 * Created by Nazimov Andrey.
 * Date: 7/10/18
 * Time: 7:34 PM
 */

import React, {PureComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class HeaderTitle extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Trak</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20
    }
});