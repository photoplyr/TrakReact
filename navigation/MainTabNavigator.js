import React from 'react';
import { StyleSheet,Platform,Button,TouchableOpacity,Text,Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ExpertsScreen from '../screens/ExpertsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
}
,
{
    /* The header config from HomeScreen is now here */
    navigationOptions: ({ navigation, screenProps }) => ({

      // header: null,
      headerStyle: {
        position: 'absolute',
        backgroundColor: '#425873',
        zIndex: 100, top: 0, left: 0, right: 0
      },

      headerLeft: <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      <Image
        style={styles.button}
        source={require('../assets/images/menu.png')}
      />
    </TouchableOpacity>,

      // headerLeft: <Button <img src={"../assets/images/app.png"} onPress={() => navigation.navigate('Options')} />,

      // headerLeft: <TouchableOpacity onPress={() => navigation.navigate("Home")}>
      // <Text>Home</Text> </TouchableOpacity>
      // // headerLeft:<Button title ="menu"/>,
      // headerTitle: 'Hello World',
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Me',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ExpertsStack = createStackNavigator({
  Links: ExpertsScreen,
},
{
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#6092EE',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });

ExpertsStack.navigationOptions = {
  tabBarLabel: 'Experts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const CommunityStack = createStackNavigator({
  Links: CommunityScreen,
},
{
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#6092EE',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });

CommunityStack.navigationOptions = {
  tabBarLabel: 'Community',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
},
{
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#6092EE',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

const styles = StyleSheet.create({
button: {
   marginLeft:10,
    width: 20,
    height: 20,
  }
});

export default createBottomTabNavigator({
  HomeStack,
  CommunityStack,
  ExpertsStack,
  SettingsStack,
});
