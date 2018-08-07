/**
 * Created by Nazimov Andrey.
 * Date: 7/11/18
 * Time: 1:58 PM
 */

import React, {Component} from 'react';
import {ScrollView, Image, Text, View, PanResponder, StyleSheet, Dimensions, AsyncStorage, Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
import moment from 'moment-timezone';

import BaseScreen from '../BaseScreen'
import HeaderBackButton from '../../components/HeaderBackButton';

// import HeaderButtons from 'react-navigation-header-buttons'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

let maxBarHeight = 367;
let percentSize = 1;
export default class EnterTrakResultScreen  extends React.Component  {

  static navigationOptions = {
    title: 'Trak',
      header: null
  };

    // static navigationOptions = ({navigation}) => {
    //     return {
    //         title: 'Enter Trak Result',
    //         headerLeft: (
    //             <HeaderBackButton navigation={navigation}/>
    //         )
    //     }
    // };
    //
    // componentWillUnmount() {
    //     const {params} = this.props.navigation.state;
    //     params.callUpdate();
    // }
    //
    // componentDidMount() {
    //     super.componentDidMount();
    //     console.log('componentDidMount..');
    // }

    constructor(props) {
        super(props);
        this.state = {
            barHeight: 0,
            prevHeight: 0,
            barValue: 0,
            barContainerDimensions: {width: 0, height: 0},
            barTopHeight: 70,
            barCenterHeight: 300,
            barBottomHeight: 24,
            barWidth: 150,
            barBgBlackSmallWidth: 150,
            styleBarWidth: 148,
            styleBarLeft: 0,
            styleBarBottom: 26,
            styleBarBgBlackBigHeight: 370
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
            <View style={styles.container}>
                <View {...this.panResponder.panHandlers} style={{flex: 1, backgroundColor: '#ffffff'}}>

                    {/*<Text>move count: {this.state.barHeight} Value: {this.state.barValue}</Text>*/}

                    <View onLayout={this._onLayout} style={styles.barContainer}>
                        <View style={[styles.barBgBlackSmall, {width: this.state.barBgBlackSmallWidth}]}/>
                        <View style={[styles.barBgBlackBig, {height: this.state.styleBarBgBlackBigHeight}]}/>

                        <View style={[styles.bar, {
                            left: this.state.styleBarLeft,
                            width: this.state.styleBarWidth,
                            bottom: this.state.styleBarBottom
                        }]}
                              height={this.state.barHeight}/>

                        <Image source={require('../../assets/images/trak_bar/prop_top_compressed.png')}
                               style={[styles.barTop, {height: this.state.barTopHeight, width: this.state.barWidth}]}/>
                        <Image source={require('../../assets/images/trak_bar/prop_center_compressed.png')}
                               style={[styles.barCenter, {
                                   height: this.state.barCenterHeight,
                                   width: this.state.barWidth
                               }]}/>
                        <Image source={require('../../assets/images/trak_bar/prop_bottom_compressed.png')}
                               style={[styles.barBottom, {
                                   height: this.state.barBottomHeight,
                                   width: this.state.barWidth
                               }]}/>
                    </View>

                    <View style={styles.btnControlContainer}>
                        <Button onPress={this._barUp} titleStyle={styles.btnTitleControl}
                                buttonStyle={styles.btnControl}
                                title="+"/>
                        <Button onPress={this._barDown} titleStyle={styles.btnTitleControl}
                                buttonStyle={styles.btnControl}
                                title="-"/>
                    </View>

                    <View style={styles.bottomContainer}>
                        <Text style={styles.bottomText}>Drag the graphic or tap the arrows to fill the channel to the
                            level
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
            </View>
        )
    }

    _add = async () => {

        if (this.state.barValue <= 0) {
            return false;
        }

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
        const value = Math.round(h / (2.4 * percentSize));
        // console.log(`H: ${h} value: ${value}`);
        this.setState(
            {barValue: value}
        );
    }

    _onLayout = event => {
        // if (this.state.dimensions) return // layout was already called
        const minBarTopHeight = 70;
        const minBarCenterHeight = 300;
        const minBarBottomHeight = 24;
        const minBarWidth = 140;
        const minBarBottom = 26;
        const minMaxBarHeight = 367;
        const minBarBgBlackBig = 370;

        let {width, height} = event.nativeEvent.layout;

        percentSize = ((height * 100) / barHeight) / 100;

        this.setState({barContainerDimensions: {width, height}});

        this.setState({barTopHeight: minBarTopHeight * percentSize});
        this.setState({barCenterHeight: minBarCenterHeight * percentSize});
        // this.setState({barBottomHeight: minBarBottomHeight * percentSize});
        this.setState({barWidth: minBarWidth * percentSize});
        this.setState({barBgBlackSmallWidth: minBarWidth * percentSize});

        this.setState({styleBarLeft: width / 2 - (( (minBarWidth - 4 ) * percentSize ) / 2)});

        this.setState({styleBarWidth: (minBarWidth - 4) * percentSize});
        this.setState({styleBarBottom: minBarBottom * percentSize});
        this.setState({styleBarBgBlackBigHeight: minBarBgBlackBig * percentSize});
        maxBarHeight = minMaxBarHeight * percentSize;

        console.log({width, height});


    }
}


let Window = Dimensions.get('window');
const barWidth = 150;
const barHeight = 394;
const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        height: 1,
        // width: barWidth - 2,
        // bottom: 26,
        // left: Window.width / 2 - ((barWidth - 2) / 2),
    },
    barContainer: {
        flex: 1,
        // backgroundColor: '#fffe03',
        marginTop: 10,
        marginBottom: 30,
        alignItems: 'center',
    },
    barTop: {
        resizeMode: Image.resizeMode.stretch,
        // width: barWidth,
        // height: 70,
        // backgroundColor: '#fffe03',
    },
    barCenter: {
        resizeMode: Image.resizeMode.stretch,
        // width: barWidth,
        // height: 300
    },
    barBottom: {
        resizeMode: Image.resizeMode.stretch,
        // width: barWidth,
        // height: 24
    },
    barBgBlackBig: {
        width: 95,
        // height: 390,
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
        fontSize: 14,
        textAlign: 'justify'
    },
    bottomContainer: {
        marginBottom: 10
        // position: 'absolute',
        // bottom: 10,
        // left: 0,
        // right: 0
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
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
    },
});
