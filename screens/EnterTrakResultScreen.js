/**
 * Created by Nazimov Andrey.
 * Date: 7/11/18
 * Time: 1:58 PM
 */

import React, {Component} from 'react';
import {ScrollView, Image, Text, View, PanResponder, StyleSheet, Dimensions} from 'react-native';
import {Button, Input} from 'react-native-elements';
import HeaderButtons from 'react-navigation-header-buttons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class EnterTrakResultScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Enter Trak Result',
        header: null,
    });


    constructor(props) {
        super(props);
        this.state = {
            barHeight: 0,
            prevHeight: 0
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderMove: (evt, gestureState) => {
                const h = this.state.prevHeight + gestureState.dy * -1;

                if (h < 0) {
                    this.setState({barHeight: 0, prevHeight: 0});
                }
                if (h > 492) {
                    this.setState({barHeight: 463, prevHeight: 463});
                }

                if (h >= 0 && h <= 463) {
                    this.setState((prev) => (
                        {barHeight: h}
                    ));
                }

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

                <Text>move count: {this.state.barHeight}</Text>

                <View style={styles.barContainer}>
                    <View style={styles.barBgBlackSmall}/>
                    <View style={styles.barBgBlackBig}/>
                    <View style={styles.bar} height={this.state.barHeight}/>
                    <Image source={require('../assets/images/trak_bar/prop_top_compressed.png')}
                           style={styles.barTop}/>
                    <Image source={require('../assets/images/trak_bar/prop_center_compressed.png')}
                           style={styles.barCenter}/>
                    <Image source={require('../assets/images/trak_bar/prop_bottom_compressed.png')}
                           style={styles.barBottom}/>
                </View>

                <Text style={styles.bottomText}>Drag the graphic or tap the arrows to fill the channel to the level that
                    matches your Trak
                    result.</Text>

                <Button
                    title="OK"
                    onPress={() => {
                        alert('OK')
                    }}

                    backgroundColor="#3b98da"
                    buttonStyle={{
                        // position: 'absolute',
                        // bottom: 0,

                        height: 45,
                        marginTop: 15,
                        marginLeft: 15,
                        marginRight: 15
                        // left: 15,
                        // right: 15
                    }}
                />

            </View>
        )
    }
}
let Window = Dimensions.get('window');
const barWidth = 170;
const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        height: 1,
        width: barWidth - 2,
        bottom: 0,
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
        height: 370
    },
    barBottom: {
        resizeMode: Image.resizeMode.stretch,
        width: barWidth,
        height: 24
    },
    barBgBlackBig: {
        width: 100,
        height: 460,
        backgroundColor: "#000",
        position: "absolute"
    },
    barBgBlackSmall: {
        width: barWidth,
        height: 400,
        backgroundColor: "#000",
        position: "absolute"
    },
    bottomText: {
        marginTop: 10,
        marginLeft: 16,
        marginRight: 16,
        fontSize: 16,
        textAlign: 'center'

    }
});
