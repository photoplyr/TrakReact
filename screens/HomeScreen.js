'use strict';

import React from 'react';
import {
    AsyncStorage,
    Image,
    Platform,
    ScrollView,
    mainStylesheet,
    Text,
    TouchableOpacity,
  	TouchableHighlight,
    View,
    Button,
    FlatList,
} from 'react-native';

import {ListItem} from 'react-native-elements'
import Grid from 'react-native-grid-component';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import Touchable from 'react-native-platform-touchable';
import Step from '../components/Step';

import { SwipeListView } from 'react-native-swipe-list-view';

var customerStatData = require('../api/statistics.json');
var customerTODOData = require('../api/todolist.json');
var customerMenuData = require('../api/menu.json');

import mainStyles from '../assets/style/style';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Trak',
        header: null
    };


    closeRow(rowMap, rowKey) {
    		if (rowMap[rowKey]) {
    			rowMap[rowKey].closeRow();
    		}
    	}

    render() {
        return (
            // Add scroller to view
            <ScrollView style={mainStyles.container} contentContainerStyle={mainStyles.contentContainer}>

                {/*// Add the action container and text header*/}

                  <Text style={mainStyles.headerContainer}>ACTION PLAN</Text>

                <View style={mainStyles.actionPlanContainer}>
                    <SwipeListView
                        useFlatList={true}
                        data={customerTODOData}

                        renderItem={({item}) => <Step title={item.key} checked={item.checked}/>}

                        renderHiddenItem={ (rowData, rowMap) => (

                            <View style={mainStyles.rowDelete}>
                                <TouchableOpacity onPress={ _ => rowMap[rowData.item.key].closeRow() }>
                                    <Text style={mainStyles.rowDeleteItem}>Delete</Text>
                                </TouchableOpacity>
                            </View>

                        )}

                       rightOpenValue={-75}
                        disableRightSwipe={true}

                        onRowOpen={(rowKey, rowMap) => {
                            setTimeout(() => {
                                rowMap[rowKey].closeRow()
                            }, 2000)
                        }}

                        // previewRowKey={this.state.customerTODOData[0].key}

                    />
                </View>

                {/*// Load the dashboard elements*/}

                <Text style={mainStyles.headerContainer}>DASHBOARD</Text>

                <View style={mainStyles.graphContainer}>

                    <FlatList
                        scrollEnabled={true}
                        numColumns={3}
                        data={customerStatData}

                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => "graph-" + index}
                        // renderItem={this._renderStatsItem}

                        renderItem={({item}) => {
                            return (
                                <View style={mainStyles.listContainer}>
                                    <AnimatedCircularProgress
                                        size={100}
                                        width={15}
                                        fill={item.value}
                                        tintColor="#00e0ff"
                                        onAnimationComplete={() => console.log('onAnimationComplete')}
                                        backgroundColor="#3d5875">
                                        {
                                            (fill) => (
                                                <Text style={mainStyles.points}>
                                                    {item.value}
                                                </Text>
                                            )
                                        }
                                    </AnimatedCircularProgress>

                                    <Text>{item.title}</Text>
                                </View>

                            );
                        }}

                    />

                </View>


              <Text style={mainStyles.headerContainer}>TRAK APPS</Text>

                <View style={mainStyles.gridContainer}>
                    <Grid
                        style={mainStyles.gridlist}
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
        <View style={mainStyles.listContainer}>
            <AnimatedCircularProgress
                size={100}
                width={15}
                fill={isNaN(item.value) ? 0 : item.value}
                tintColor="#00e0ff"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#3d5875">
                {
                    (fill) => (
                        <Text style={mainStyles.points}>
                            {item.value}
                        </Text>
                    )
                }
            </AnimatedCircularProgress>

            <Text>{item.title}</Text>
        </View>

    );


    _renderAppsItem = (data, i) => (
        <Touchable
            style={{flex: 1, backgroundColor: data.background, margin: 1}}
            background={Touchable.Ripple('#ccc', true)}
            key={data.key}
            onPress={() => this._pressAppItem(data.key)}
        >
            <View style={mainStyles.griditem}>
                <Image
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        alignItems: 'center',
                        height: '50%',
                        width: '50%',
                        resizeMode: Image.resizeMode.contain,
                    }}
                    source={{uri: data.imageUrl}}
                />
                <Text style={mainStyles.gridText}>{data.title}</Text>
            </View>
        </Touchable>
    );

    _renderPlaceholder = i => <View style={mainStyles.griditem} key={i}/>;

    _pressAppItem(key) {
        switch (key) {
            case 'trak':
                this.props.navigation.navigate('TrakScreen');
                break;
            case 'steps':
                this.props.navigation.navigate('StepsScreen');
                break;
            default:
                this.props.navigation.navigate('TestScreen');
                break;
        }
    }

    async _logOut() {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
    }

}
