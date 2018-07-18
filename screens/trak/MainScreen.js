/**
 * Created by Nazimov Andrey.
 * Date: 7/11/18
 * Time: 2:53 PM
 */

import React from 'react';
import {Text, View, StyleSheet, FlatList, AsyncStorage} from 'react-native';
import {Button, Input} from 'react-native-elements';
import _ from 'lodash';
import TrakPropGraphic from '../../components/TrakPropGraphic';
import TrakResultListItem from '../../components/TrakResultListItem';

export default class TrakScreen extends React.Component {
    static navigationOptions = {
        title: 'Trak',
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            resultList: [],
            progress: 0
        }
    }

    componentDidMount() {
        this._loadTrakResultList();
    }

    // componentDidUpdate(){
    //     console.log('componentDidMount');
    //     this._loadTrakResultList();
    // }

    callUpdate() {
        console.log('call update');
        this._loadTrakResultList();
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
                <Text style={{textAlign: 'center'}}>TRAK RESULT</Text>

                <View style={{alignItems: 'center'}}>
                    <TrakPropGraphic progress={this.state.progress} height={250} style={{height: 250}}/>
                </View>

                <FlatList
                    data={this.state.resultList}
                    renderItem={({item}) => <TrakResultListItem key={item.key} _key={item.key} date={item.date}
                                                                result={item.result}
                                                                value={item.value}
                                                                onPressRemoveItem={this.callRemoveItem.bind(this)}/>}
                />

                <View style={styles.btnContainer}>
                    <Button
                        title="Add"
                        onPress={() => {
                            this.props.navigation.navigate('EnterTrakResultScreen', {callUpdate: this.callUpdate.bind(this)})
                        }}

                        backgroundColor="#3b98da"
                        buttonStyle={{
                            height: 45,
                            margin: 10
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
        backgroundColor: '#fff'
    },
    btnContainer: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
    }
})