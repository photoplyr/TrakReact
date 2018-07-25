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
            <HeaderButtons IconComponent={Icon} iconSize={25} color="#fff">
                <HeaderButtons.Item title="Back" iconName="ios-arrow-back" onPress={navigation.getParam('goBack')}/>
            </HeaderButtons>
        )
    }
}