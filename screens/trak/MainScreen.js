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
import TrakPropGraphic from '../../components/TrakPropGraphic';
import TrakResultListItem from '../../components/TrakResultListItem';
import mainStyles from '../../assets/style/style';
import ApiService from '../../services/ApiService';

export default class TrakScreen extends BaseScreen {

    static navigationOptions = ({navigation}) => {
        return {
            header: null
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
        this.setState({isLoading: true});
        await new ApiService().Trak().deleteResultItem(key);
        await this._loadTrakResultList();
    };

    _loadingView() {
        return <View
            style={styles.loadingContainer}>
            <ActivityIndicator style={{}} size="large"/>
        </View>
    }

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

                    {this.state.isLoading ? this._loadingView() : null}

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

        let list = [];

        if (resp && resp.status === 200) {
            list = resp.data;
        }

        _.reverse(list);

        let avgValue = 0;
        for (const item of list) {
            avgValue += item.value;
        }
        avgValue = avgValue / _.size(list);

        this.setState({
            isLoading: false,
            resultList: list,
            progress: avgValue * 0.94
        });
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
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    }
})
