/**
 * Created by Nazimov Andrey.
 * Date: 7/11/18
 * Time: 2:53 PM
 */

import React from 'react';
import {Text, View, StyleSheet, requireNativeComponent} from 'react-native';
import {Button, Input} from 'react-native-elements'
import TrakPropGraphic from '../../components/TrakPropGraphic'


export default class TrakScreen extends React.Component {
    static navigationOptions = {
        title: 'Trak',
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{textAlign: 'center'}}>TRAK RESULT</Text>

                <View style={{alignItems: 'center'}}>
                    <TrakPropGraphic height={250} style={{height: 250}}/>
                </View>

                <View style={styles.btnContainer}>
                    <Button
                        title="Add"
                        onPress={() => {
                            this.props.navigation.navigate('EnterTrakResultScreen')
                        }}

                        backgroundColor="#3b98da"
                        buttonStyle={{
                            height: 45,
                            margin: 10
                        }}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    btnContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
})