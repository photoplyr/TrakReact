import React from 'react';
import {createSwitchNavigator, createStackNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const AuthStack = createStackNavigator({SignIn: SignInScreen, SignUp: SignUpScreen});
const AppStack = createStackNavigator({Main: {screen: MainTabNavigator, navigationOptions: {header: null}}});

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