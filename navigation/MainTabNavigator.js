import React from 'react';
import {Platform} from 'react-native';
import {DrawerActions, createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ExpertScreen from '../screens/ExpertScreen';
import CommunityScreen from '../screens/CommunityScreen';
import QuizScreen from '../screens/QuizScreen';
import MainTrakScreen from '../screens/trak/MainScreen';
import StepsScreen from '../screens/StepsScreen';

// import SettingsScreen from '../screens/SettingsScreen';
// import TestScreen from '../screens/TestScreen'
// import HeaderButtons from 'react-navigation-header-buttons'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    TrakScreen: MainTrakScreen,
    StepsScreen: StepsScreen
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

const QuizStack = createStackNavigator({
    Quiz: QuizScreen,
});

QuizStack.navigationOptions = {
    tabBarLabel: 'Quiz',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-clipboard${focused ? '' : '-outline'}` : 'md-people'}
        />
    ),
};

const CommunityStack = createStackNavigator({
    Community: CommunityScreen,
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
    Expert: ExpertScreen,
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

ExpertsStack.transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
    }
}

// const TabTrakStack = createStackNavigator({
//     TrakTab: TabTrakScreen,
//     EnterTrakResultScreen: EnterTrakResultScreen
// });
//
// TabTrakStack.navigationOptions = {
//     tabBarLabel: 'Trak',
//     tabBarIcon: ({focused}) => (
//         <TabBarIcon
//             focused={focused}
//             name={Platform.OS === 'ios' ? `ios-color-wand${focused ? '' : '-outline'}` : 'md-color-wand'}
//         />
//     ),
// };

// const SettingsStack = createStackNavigator({
//     Settings: SettingsScreen,
// });
//
// SettingsStack.navigationOptions = {
//     tabBarLabel: 'Settings',
//     tabBarIcon: ({focused}) => (
//         <TabBarIcon
//             focused={focused}
//             name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
//         />
//     ),
// };


export default createBottomTabNavigator({
    HomeStack,
    QuizStack,
    CommunityStack,
    ExpertsStack,
    // TabTrakStack,
});
