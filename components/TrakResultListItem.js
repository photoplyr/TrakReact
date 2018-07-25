/**
 * Created by Nazimov Andrey.
 * Date: 7/18/18
 * Time: 12:05 PM
 */

import * as React from "react";
import {StyleSheet, View, Image, Text, TouchableOpacity} from "react-native";
import Touchable from 'react-native-platform-touchable';
import Icon from 'react-native-vector-icons/Ionicons';
import mainStyles from '../assets/style/style';
import mainProps from '../assets/style/prop';
import moment from 'moment-timezone';

export default class TrakResultListItem extends React.PureComponent {

    render() {
        const {_key, date, result, value, onPressRemoveItem} = this.props;
        let _result = '';
        let _color = '#ffe43c';
        if (value > 15 && value < 56) {
            _result = 'Moderate';
            _color = '#ffe43c';
        }
        if (value < 15) {
            _result = 'Low';
            _color = '#d23e36';
        }
        if (value > 55) {
            _result = 'Optimal';
            _color = '#a8ca50';
        }

        return (
            <View style={styles.container}>
                <Text style={styles.date}>{moment(date).format('YYYY.MM.DD')}</Text>
                {<Text style={styles.value}>{value}M/mL</Text>}

                <View style={{flex: 0, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{
                        position: 'absolute',
                        borderRadius: 10,
                        backgroundColor: _color,
                        width: 15,
                        height: 15
                    }}/>
                    <Text style={styles.result}>{_result}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => onPressRemoveItem(_key)}>
                    <Icon name="ios-close" size={25}
                          color={mainProps.drawerMenuIcon.color}
                          style={{}}/>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,

        backgroundColor: '#fdfdfd',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EDEDED',
    },
    result: {
        width: 90,
        marginLeft: 20,
        fontSize: 14,
        color: '#404040'
    },
    date: {
        fontSize: 14,
        width: 100,
        color: '#404040'
    },
    text: {
        fontSize: 14,
        color: '#404040'
    },
    value: {
        width: 65,
        fontSize: 14,
        color: '#404040'
    }
});
