/**
 * Created by Nazimov Andrey.
 * Date: 7/5/18
 * Time: 12:38 PM
 */

import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import BaseScreen from './BaseScreen'
import HeaderBackButton from '../components/HeaderBackButton';

export default class StepsScreen extends BaseScreen {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Steps',
            header: null
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Steps</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
    },
})