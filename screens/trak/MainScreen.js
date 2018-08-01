/**
 * Created by Nazimov Andrey.
 * Date: 7/11/18
 * Time: 2:53 PM
 */

import React from 'react';
import {Text, View, StyleSheet, FlatList, AsyncStorage, mainStylesheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import _ from 'lodash';
import BaseScreen from '../BaseScreen'
import HeaderBackButton from '../../components/HeaderBackButton';
import TrakPropGraphic from '../../components/TrakPropGraphic';
import TrakResultListItem from '../../components/TrakResultListItem';
import mainStyles from '../../assets/style/style';

export default class TrakScreen extends BaseScreen {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Trak',
            headerLeft: (
                <HeaderBackButton navigation={navigation}/>
            )
        }
    };

    isWillUnmound = false;

    constructor(props) {
        super(props);

        this.state = {
            resultList: [],
            progress: 0
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
        const listRaw = await AsyncStorage.getItem('trak_result');
        const list = listRaw == null ? [] : JSON.parse(listRaw);

        var newList = _.remove(list, function (n) {
            return n.key != key;
        });

        // for (const i in list) {
        //     if (list[i].key == key) {
        //         delete list[i];
        //     }
        // }

        await AsyncStorage.setItem('trak_result', JSON.stringify(newList));
        await this._loadTrakResultList();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={mainStyles.headerContainer}>INDICATOR</Text>


                <View style={{alignItems: 'center'}}>
                    <TrakPropGraphic progress={this.state.progress} height={150} style={{height: 150}}/>
                </View>


                <Text style={mainStyles.headerContainer}>RESULTS</Text>

                <FlatList style={styles.resultContainer}
                          data={this.state.resultList}
                          renderItem={({item}) => <TrakResultListItem key={item.key} _key={item.key} date={item.date}
                                                                      result={item.result}
                                                                      value={item.value}
                                                                      onPressRemoveItem={this.callRemoveItem.bind(this)}/>}
                />

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
        const listRaw = await AsyncStorage.getItem('trak_result');
        const list = listRaw == null ? [] : JSON.parse(listRaw);
        _.reverse(list);

        let avgValue = 0;
        for (const item of list) {
            avgValue += item.value;
        }
        avgValue = avgValue / _.size(list);

        this.setState({progress: avgValue});
        this.setState({resultList: list});
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
        flex:1,
        flexDirection: 'row',
        marginBottom:10
    }
})
