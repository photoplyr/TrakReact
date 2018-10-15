/**
 * Created by Nazimov Andrey.
 * Date: 7/25/18
 * Time: 8:19 AM
 */
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderButtons from 'react-navigation-header-buttons'

export default class HeaderBackButton extends React.PureComponent {
    render() {
        const {navigation} = this.props;
        return (
            <HeaderButtons  IconComponent={Icon} iconSize={30} color="#fff">
                <HeaderButtons.Item style={{margin: 10}} title="Back" iconName="ios-arrow-back" onPress={navigation.getParam('goBack')}/>
            </HeaderButtons>
        )
    }
}