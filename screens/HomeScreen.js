import React from 'react';
import {
    AsyncStorage,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    FlatList
} from 'react-native';

import {ListItem} from 'react-native-elements'
import Grid from 'react-native-grid-component';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import Step from '../components/Step';

var customerStatData = require('../api/statistics.json');
var customerTODOData = require('../api/todolist.json');
var customerMenuData = require('../api/menu.json');

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Trak',
        header: null
    };

    render() {
        return (
            // Add scroller to view
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                {/*// Add the action container and text header*/}
                <View style={styles.actionPlanContainer}>
                    <Text style={styles.sectionHeader}>ACTION PLAN</Text>
                    <FlatList
                        data={customerTODOData}
                        renderItem={({item}) => <Step title={item.key} checked={item.checked}/>}
                    />
                </View>

                {/*// Load the dashboard elements*/}
                <View style={styles.dashboardContainer}>
                    <Text style={styles.sectionHeader}>DASHBOARD</Text>

                    <FlatList
                        numColumns={3}
                        data={customerStatData}

                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => "graph-" + index}
                        // renderItem={this._renderStatsItem}

                        renderItem={({item}) => {
                            return (

                                <View style={styles.listContainer}>
                                    <AnimatedCircularProgress
                                        size={100}
                                        width={15}
                                        fill={item.value}
                                        tintColor="#00e0ff"
                                        onAnimationComplete={() => console.log('onAnimationComplete')}
                                        backgroundColor="#3d5875">
                                        {
                                            (fill) => (
                                                <Text style={styles.points}>
                                                    {item.value}
                                                </Text>
                                            )
                                        }
                                    </AnimatedCircularProgress>

                                    <Text>{item.title}</Text>
                                </View>

                            );
                        }
                      }

                    />

                </View>



              <Text style={styles.headerContainer}>TRAK APPS</Text>

                <View style={styles.gridContainer}>

                    <Grid
                        style={styles.gridlist}
                        renderItem={this._renderAppsItem}
                        renderPlaceholder={this._renderPlaceholder}
                        data={customerMenuData}
                        itemsPerRow={2}
                    />
                </View>

            </ScrollView>
        )

    }

    _renderStatsItem = (item, i) => (

      <View style={styles.listContainer}>
                  <AnimatedCircularProgress
                      size={100}
                      width={15}
                      fill={isNaN(item.value) ? 0 : item.value}
                      tintColor="#00e0ff"
                      onAnimationComplete={() => console.log('onAnimationComplete')}
                      backgroundColor="#3d5875">
                      {
                          (fill) => (
                              <Text style={styles.points}>
                                  {item.value}
                              </Text>
                          )
                      }
                  </AnimatedCircularProgress>

                  <Text>{item.title}</Text>
              </View>

    );


    _renderAppsItem = (data, i) => (

        <View style={[{backgroundColor: data.background}, styles.griditem]} key={i}>

            <Image
                style={{marginTop: 20, marginBottom: 20, alignItems: 'center', height: '55%', width: '55%'}}
                source = {{uri: data.imageUrl}}
            />

            <Text>{data.title}</Text>

        </View>
    );

    _renderPlaceholder = i => <View style={styles.griditem} key={i}/>;

    async _logOut() {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: '#fff',
    }, getStartedContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
        marginHorizontal: 50,
    }, contentContainer: {}, actionPlanContainer: {
        paddingLeft: 20,
    }, headerContainer: {
        paddingLeft: 20,
          paddingTop: 10,
        backgroundColor: '#fff',
        fontSize: 24,
        color: "#E08944",
    }, dashboardContainer: {
        paddingLeft: 20,
        backgroundColor: '#fff',
        height: 170,
    }, sectionHeader: {
        paddingTop: 15,
        fontSize: 24,
        color: "#E08944",
    }, headerHeader: {
        backgroundColor: '#fff',
    }, listContainer: {
        padding: 5,
        backgroundColor: '#fff',
        height: 170,
        alignItems: 'center',
    }, points: {
        alignItems: 'center',
        fontSize: 30,
    }, gridlist: {
        flex: 1,
    },
    griditem: {
        alignItems: 'center',
        flex: 1,
        height: 160,
        margin: 1
    }, gridContainer: {
        margin: 10,
        backgroundColor: '#fff',
    },

});
