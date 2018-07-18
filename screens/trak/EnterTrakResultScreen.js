/**
 * Created by Nazimov Andrey.
 * Date: 7/11/18
 * Time: 1:58 PM
 */

import React, {Component} from 'react';
import {ScrollView, Image, Text, View, PanResponder, StyleSheet, Dimensions, AsyncStorage} from 'react-native';
import {Button, Input} from 'react-native-elements';
import moment from 'moment-timezone';

// import HeaderButtons from 'react-navigation-header-buttons'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const maxBarHeight = 367;

export default class EnterTrakResultScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Enter Trak Result',
        header: null,
    });

    componentWillUnmount() {
        const {params} = this.props.navigation.state;
        params.callUpdate();
    }

    constructor(props) {
        super(props);
        this.state = {
            barHeight: 0,
            prevHeight: 0,
            barValue: 0
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderMove: (evt, gestureState) => {
                const h = this.state.prevHeight + gestureState.dy * -1;

                if (h < 0) {
                    this.setState({barHeight: 0, prevHeight: 0});
                }
                if (h > maxBarHeight) {
                    this.setState({barHeight: maxBarHeight, prevHeight: maxBarHeight});
                }

                if (h >= 0 && h <= maxBarHeight) {
                    this.setState((prev) => (
                        {barHeight: h}
                    ));
                }

                this._calculateValue();
            },
            onPanResponderGrant: (evt, gestureState) => {
                // console.log('Grant gestureState: ', gestureState);
            },
            onPanResponderRelease: (e, gestureState) => {
                // console.log('Release gesture: ', gestureState);
                this.setState(
                    {prevHeight: this.state.barHeight}
                );
            }
        });
    }

    render() {
        const {navigation} = this.props;
        // const _itemId = navigation.getParam('itemId', 0);
        // const _name = navigation.getParam('name', 'no-name');

        return (
            <View {...this.panResponder.panHandlers} style={{flex: 1, backgroundColor: '#ffffff'}}>

                {/*<Text>move count: {this.state.barHeight} Value: {this.state.barValue}</Text>*/}

                <View style={styles.barContainer}>
                    <View style={styles.barBgBlackSmall}/>
                    <View style={styles.barBgBlackBig}/>
                    <View style={styles.bar} height={this.state.barHeight}/>
                    <Image source={require('../../assets/images/trak_bar/prop_top_compressed.png')}
                           style={styles.barTop}/>
                    <Image source={require('../../assets/images/trak_bar/prop_center_compressed.png')}
                           style={styles.barCenter}/>
                    <Image source={require('../../assets/images/trak_bar/prop_bottom_compressed.png')}
                           style={styles.barBottom}/>
                </View>

                <View style={styles.btnControlContainer}>
                    <Button onPress={this._barUp} titleStyle={styles.btnTitleControl} buttonStyle={styles.btnControl}
                            title="+"/>
                    <Button onPress={this._barDown} titleStyle={styles.btnTitleControl} buttonStyle={styles.btnControl}
                            title="-"/>
                </View>

                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>Drag the graphic or tap the arrows to fill the channel to the level
                        that matches your Trak result.</Text>

                    <Button
                        title="OK"
                        onPress={this._add}

                        backgroundColor="#3b98da"
                        buttonStyle={{
                            height: 45,
                            marginTop: 15,
                            marginLeft: 15,
                            marginRight: 15
                        }}
                    />
                </View>
            </View>
        )
    }

    _add = async () => {
        const listRaw = await AsyncStorage.getItem('trak_result');
        const list = listRaw == null ? [] : JSON.parse(listRaw);

        list.push({
            key: new Date().getTime().toString(),
            date: moment().format(),
            result: 'test',
            value: this.state.barValue
        });

        await AsyncStorage.setItem('trak_result', JSON.stringify(list));
        this.props.navigation.goBack();
    }

    _barUp = async () => {
        const h = this.state.barHeight + 1;
        if (h < 0) {
            await this.setState({barHeight: 0, prevHeight: 0});
        } else if (h > maxBarHeight) {
            await this.setState({barHeight: maxBarHeight, prevHeight: maxBarHeight});
        } else {
            await this.setState((prev) => (
                {barHeight: prev.barHeight + 1}
            ));
        }
        this._calculateValue();
    }

    _barDown = async () => {
        const h = this.state.barHeight - 1;
        if (h < 0) {
            await this.setState({barHeight: 0, prevHeight: 0});
        } else if (h > maxBarHeight) {
            await this.setState({barHeight: maxBarHeight, prevHeight: maxBarHeight});
        } else {
            await this.setState((prev) => (
                {barHeight: prev.barHeight - 1}
            ));
        }
        this._calculateValue();
    };

    _calculateValue = () => {
        const h = this.state.barHeight;
        const value = Math.round(h / 2.5);
        // console.log(`H: ${h} value: ${value}`);
        this.setState(
            {barValue: value}
        );
    }
}


let Window = Dimensions.get('window');
const barWidth = 160;
const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        height: 1,
        width: barWidth - 2,
        bottom: 26,
        left: Window.width / 2 - ((barWidth - 2) / 2),
    },
    barContainer: {
        // flex: 1,
        // backgroundColor: '#fffe03',
        marginTop: 10,
        alignItems: 'center',
    },
    barTop: {
        resizeMode: Image.resizeMode.stretch,
        width: barWidth,
        height: 70,
        // backgroundColor: '#fffe03',
    },
    barCenter: {
        resizeMode: Image.resizeMode.stretch,
        width: barWidth,
        height: 300
    },
    barBottom: {
        resizeMode: Image.resizeMode.stretch,
        width: barWidth,
        height: 24
    },
    barBgBlackBig: {
        width: 100,
        height: 390,
        backgroundColor: "#000",
        position: "absolute"
    },
    barBgBlackSmall: {
        width: barWidth,
        height: 330,
        backgroundColor: "#000",
        position: "absolute"
    },
    bottomText: {
        marginTop: 10,
        marginLeft: 16,
        marginRight: 16,
        fontSize: 16,
        textAlign: 'center'
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0
    },
    btnControlContainer: {
        position: 'absolute',
        flex: 1,
        right: 0,
        margin: 15,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        // alignContent:'center',
        // backgroundColor: '#05ff72'
    },
    btnControl: {
        margin: 5,
        height: 45,
        width: 45
    },
    btnTitleControl: {
        fontSize: 25
    }
});
