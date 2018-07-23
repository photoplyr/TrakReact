import React from 'react';
import {createSwitchNavigator, createStackNavigator, createDrawerNavigator} from 'react-navigation';
import {Text, TouchableOpacity, Button, Platform} from 'react-native'
import {DrawerActions} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import DrawerScreen from '../components/DrawerScreen';

import HeaderTitle from '../components/HeaderTitle';
import HeaderButtons from 'react-navigation-header-buttons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TestScreen from '../screens/TestScreen'

const AuthStack = createStackNavigator({
    SignIn: SignInScreen,
    SignUp: SignUpScreen
});


const DrawerNavigator = createDrawerNavigator({
    Main: MainTabNavigator
}, {
    initialRouteName: 'Main',
    contentComponent: DrawerScreen,
    drawerWidth: 300
});

const AppStack = createStackNavigator({
        DrawerNavigator: {
            screen: DrawerNavigator
        },
        TestScreen: {
            screen: TestScreen
        },
    }, {
        navigationOptions: ({navigation}) => {
            return {
                headerStyle: {
                    backgroundColor: '#202E39',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    textAlign: "center",
                },
                title: 'Trak',
                headerLeft: (
                    <HeaderButtons IconComponent={MaterialIcons} iconSize={25} color="#fff">
                        <HeaderButtons.Item title="add" iconName="menu"
                                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
                    </HeaderButtons>
                )

                // ,headerRight: (
                //     <HeaderButtons IconComponent={MaterialIcons} iconSize={25} color="#fff">
                //         <HeaderButtons.Item title="add" iconName="add" onPress={() => alert('Hello')}/>
                //     </HeaderButtons>
                // )
            }
        }
    }
);


export default createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);
