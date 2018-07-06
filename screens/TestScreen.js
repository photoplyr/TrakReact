/**
 * Created by Nazimov Andrey.
 * Date: 7/5/18
 * Time: 12:38 PM
 */

import React, {Component} from 'react';
import {ScrollView, Text, View, Button} from 'react-native';

export default class TestScreen extends Component {
    static navigationOptions = {
        title: 'Test Screen',
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info!"
            />
        )
    };

    render() {
        const {navigation} = this.props;
        const _itemId = navigation.getParam('itemId', 0);
        const _name = navigation.getParam('name', 'no-name');

        return (
            <View>
                <Text>Hello {_name}. Your ID: {_itemId}</Text>

                <Button title="Click me again!" onPress={()=>this.props.navigation.push('Test')}/>

            </View>
        )
    }
}