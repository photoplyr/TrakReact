/**
 * Created by Nazimov Andrey.
 * Date: 7/5/18
 * Time: 12:38 PM
 */

import React, {Component} from 'react';
import {ScrollView, Text, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButtons from 'react-navigation-header-buttons'

export default class TestScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'TEST',
            headerLeft: (
                <HeaderButtons IconComponent={Icon} iconSize={25} color="#fff">
                    <HeaderButtons.Item title="Back" iconName="ios-arrow-back"
                                        onPress={navigation.getParam('goBack')}/>
                </HeaderButtons>
            )
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({goBack: this._goBack});
    }

    _goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        const {navigation} = this.props;
        const _itemId = navigation.getParam('itemId', 0);
        const _name = navigation.getParam('name', 'no-name');

        return (
            <View>
                <Text>Hello {_name}. Your ID: {_itemId}</Text>

                <Button title="Click me again!" onPress={() => this._goBack()}/>

            </View>
        )
    }
}