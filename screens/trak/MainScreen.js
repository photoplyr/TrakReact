/**
 * Created by Nazimov Andrey.
 * Date: 7/11/18
 * Time: 2:53 PM
 */

import React from 'react';
import {Text, View, StyleSheet, FlatList, AsyncStorage, mainStylesheet, ActivityIndicator} from 'react-native';
import {Button, Input} from 'react-native-elements';
import _ from 'lodash';
import BaseScreen from '../BaseScreen'
import HeaderBackButton from '../../components/HeaderBackButton';
import TrakPropGraphic from '../../components/TrakPropGraphic';
import TrakResultListItem from '../../components/TrakResultListItem';
import mainStyles from '../../assets/style/style';
import ApiService from '../../services/ApiService';

export default class TrakScreen extends BaseScreen {

    static navigationOptions = ({navigation}) => {
        return {
            header: null
            // title: 'Trak',
            // headerLeft: (
            //     <HeaderBackButton navigation={navigation}/>
            // )
        }
    };

    isWillUnmound = false;

    constructor(props) {
        super(props);

        this.state = {
            resultList: [],
            progress: 0,
            isLoading: true
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this._loadTrakResultList();
    }

    componentWillUnmount() {
        this.isWillUnmound = true;
    }

    callUpdate() {
        if (!this.isWillUnmound) {
            this._loadTrakResultList();
        }
    }

    callRemoveItem = async (key) => {
        // const listRaw = await AsyncStorage.getItem('trak_result');
        // const list = listRaw == null ? [] : JSON.parse(listRaw);
        //
        // var newList = _.remove(list, function (n) {
        //     return n.key != key;
        // });
        //
        // // for (const i in list) {
        // //     if (list[i].key == key) {
        // //         delete list[i];
        // //     }
        // // }
        //
        // await AsyncStorage.setItem('trak_result', JSON.stringify(newList));
        await new ApiService().Trak().deleteResultItem(key);
        await this._loadTrakResultList();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={mainStyles.headerContainer}>INDICATOR</Text>


                <View style={{alignItems: 'center'}}>
                    <TrakPropGraphic progress={this.state.progress} height={150} style={{height: 150}}/>
                </View>


                <View style={{flex: 1}}>
                    <Text style={mainStyles.headerContainer}>RESULTS</Text>

                    <FlatList style={styles.resultContainer}
                              keyExtractor={(item, index) => item.id.toString()}
                              data={this.state.resultList}
                              renderItem={({item}) => <TrakResultListItem id={item.id.toString()} _key={item.id}
                                                                          date={item.date}
                                                                          result={item.result}
                                                                          value={item.value}
                                                                          onPressRemoveItem={this.callRemoveItem.bind(this)}/>}
                    />

                    <View
                        style={{
                            display: this.state.isLoading ? 'flex' : 'none',
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            justifyContent: 'center'
                        }}>
                        <ActivityIndicator style={{}} size="large"/>
                    </View>
                </View>

                <View style={styles.btnContainer}>
                    <Button
                        title="Semen Analysis"
                        onPress={() => {
                            this.props.navigation.navigate('SemenAnalysisScreen', {callUpdate: this.callUpdate.bind(this)})
                        }}

                        backgroundColor="#3b98da"
                        containerStyle={{
                            flex: 1
                        }}
                        buttonStyle={{
                            height: 45,
                            margin: 10,
                        }}
                    />
                    <Button
                        title="Trak Result"
                        onPress={() => {
                            this.props.navigation.navigate('EnterTrakResultScreen', {callUpdate: this.callUpdate.bind(this)})
                        }}

                        backgroundColor="#3b98da"
                        containerStyle={{
                            flex: 1
                        }}
                        buttonStyle={{
                            height: 45,
                            margin: 10,
                        }}
                    />
                </View>
            </View>
        );
    }

    async _loadTrakResultList() {
        this.setState({isLoading: true});
        const resp = await new ApiService().Trak().getResultList();
        // const listRaw = await AsyncStorage.getItem('trak_result');
        let list = [];

        if (resp) {
            list = resp.data;
        }

        _.reverse(list);

        let avgValue = 0;
        for (const item of list) {
            avgValue += item.value;
        }
        avgValue = avgValue / _.size(list);

        this.setState({progress: avgValue * 0.94});
        this.setState({resultList: list});
        this.setState({isLoading: false});
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
    },
    resultContainer: {
        backgroundColor: '#FDFDFD'
    },
    btnContainer: {
        flexDirection: 'row',
    }
})
