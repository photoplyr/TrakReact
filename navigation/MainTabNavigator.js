import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TestScreen from '../screens/TestScreen'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Test: TestScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Me',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-person${focused ? '' : '-outline'}`
                    : 'md-person'
            }
        />
    ),
};

const CommunityStack = createStackNavigator({
    Links: LinksScreen,
});

CommunityStack.navigationOptions = {
    tabBarLabel: 'Community',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-people${focused ? '' : '-outline'}` : 'md-people'}
        />
    ),
};

const ExpertsStack = createStackNavigator({
    Links: LinksScreen,
});

ExpertsStack.navigationOptions = {
    tabBarLabel: 'Experts',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-chatbubbles${focused ? '' : '-outline'}` : 'md-chatbubbles'}
        />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    CommunityStack,
    ExpertsStack,
    SettingsStack,
});
