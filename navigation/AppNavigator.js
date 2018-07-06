import React from 'react';
import {createSwitchNavigator, createStackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const AuthStack = createStackNavigator({SignIn: SignInScreen});
const AppStack = createStackNavigator({Main: MainTabNavigator});

export default createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    });