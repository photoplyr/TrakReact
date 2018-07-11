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

var styles = require('../assets/style/style.js');

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

                  <Text style={styles.headerContainer}>ACTION PLAN</Text>

                <View style={styles.actionPlanContainer}>
                    <FlatList
                        data={customerTODOData}
                        renderItem={({item}) => <Step title={item.key} checked={item.checked}/>}
                    />
                </View>

                {/*// Load the dashboard elements*/}

                <Text style={styles.headerContainer}>DASHBOARD</Text>


                <View style={styles.graphContainer}>

                    <FlatList
                        scrollEnabled={false}
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

            <Text style={styles.gridText}>{data.title}</Text>

        </View>
    );

    _renderPlaceholder = i => <View style={styles.griditem} key={i}/>;

    async _logOut() {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
    }

}
