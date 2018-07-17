/**
 * Created by Nazimov Andrey.
 * Date: 7/10/18
 * Time: 7:08 PM
 */

import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, StyleSheet, Image, AsyncStorage} from 'react-native';
import {DrawerActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from 'react-native-platform-touchable';

import mainStyles from '../assets/style/style';
import mainProps from '../assets/style/prop';

class DrawerScreen extends Component {
    static navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View>

                        {/*<Touchable*/}
                            {/*style={styles.option}*/}
                            {/*background={Touchable.Ripple('#ccc', false)}*/}
                            {/*onPress={() => this.props.navigation.dispatch(DrawerActions.closeDrawer())}>*/}
                            {/*<View style={{flexDirection: 'row', alignItems: "center",}}>*/}
                                {/*<View style={styles.optionIconContainer}>*/}
                                    {/*<Icon name="ios-body-outline" size={mainStyles.props.drawerMenuIcon.size}*/}
                                          {/*color={mainStyles.props.drawerMenuIcon.color} style={{marginTop: 1}}/>*/}
                                {/*</View>*/}
                                {/*<View style={styles.optionTextContainer}>*/}
                                    {/*<Text style={styles.optionText}>*/}
                                        {/*Item 1*/}
                                    {/*</Text>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                        {/*</Touchable>*/}

                        {/*<Touchable*/}
                            {/*style={styles.option}*/}
                            {/*background={Touchable.Ripple('#ccc', false)}*/}
                            {/*onPress={() => {*/}
                                {/*this.props.navigation.dispatch(DrawerActions.closeDrawer());*/}
                            {/*}}>*/}
                            {/*<View style={{flexDirection: 'row', alignItems: "center",}}>*/}
                                {/*<View style={styles.optionIconContainer}>*/}
                                    {/*<Icon name="ios-chatbubbles-outline" size={mainStyles.props.drawerMenuIcon.size}*/}
                                          {/*color={mainStyles.props.drawerMenuIcon.color} style={{marginTop: 1}}/>*/}
                                {/*</View>*/}
                                {/*<View style={styles.optionTextContainer}>*/}
                                    {/*<Text style={styles.optionText}>*/}
                                        {/*Enter Trak Result*/}
                                    {/*</Text>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                        {/*</Touchable>*/}
                    </View>

                </ScrollView>

                <View style={{position: 'relative', bottom: 0}}>
                    <Touchable
                        style={styles.option}
                        background={Touchable.Ripple('#ccc', false)}
                        onPress={async () => {
                            this.props.navigation.dispatch(DrawerActions.closeDrawer());
                            await AsyncStorage.removeItem('userToken');
                            this.props.navigation.navigate('Auth');
                        }}>
                        <View style={{flexDirection: 'row', alignItems: "center",}}>
                            <View style={styles.optionIconContainer}>
                                <Icon name="ios-log-out" size={mainProps.drawerMenuIcon.size}
                                      color={mainProps.drawerMenuIcon.color}
                                      style={mainStyles.drawerMenuIcon}/>
                            </View>
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionText}>
                                    Log Out
                                </Text>
                            </View>
                        </View>
                    </Touchable>
                </View>
            </View>
        );
    }
}

DrawerScreen.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
    },
    optionsTitleText: {
        fontSize: 16,
        marginLeft: 15,
        marginTop: 9,
        marginBottom: 12,
    },
    optionIconContainer: {
        marginRight: 9,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED',
    },
    optionText: {
        fontSize: 20,
        marginTop: 1,
    },
});

export default DrawerScreen;