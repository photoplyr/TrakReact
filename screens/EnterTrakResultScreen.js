/**
 * Created by Nazimov Andrey.
 * Date: 7/11/18
 * Time: 1:58 PM
 */

import React, {Component} from 'react';
import {ScrollView, Text, View, Button, PanResponder, Animated} from 'react-native';
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
            moveCount: 0
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            // onPanResponderMove: Animated.event([null, {
            //     dx: this.state.pan.x,
            //     dy: this.state.pan.y
            // }]),
            onPanResponderMove: (evt, gestureState) => {
                console.log('x: ', gestureState);

                if (Math.abs(gestureState.dx) < 10) {
                    if (gestureState.dy < 0) {
                        this.setState((prev) => (
                            {moveCount: ++prev.moveCount}
                        ))
                    } else {
                        this.setState((prev) => (
                            {moveCount: --prev.moveCount}
                        ))
                    }
                }


                // console.log('y: ',this.state.pan.y);
                // The most recent move distance is gestureState.move{X,Y}

                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
            },
            // onPanResponderRelease: (e, gesture) => {
            //     // if (this.isDropZone(gesture)) {
            //     //     this.setState({
            //     //         showDraggable: false
            //     //     });
            //     // } else {
            //     //     Animated.spring(
            //     //         this.state.pan,
            //     //         {toValue: {x: 0, y: 0}}
            //     //     ).start();
            //     // }
            // }
        });
    }

    render() {
        const {navigation} = this.props;
        // const _itemId = navigation.getParam('itemId', 0);
        // const _name = navigation.getParam('name', 'no-name');

        return (
            <View {...this.panResponder.panHandlers} style={{flex: 1, backgroundColor: '#05ff72'}}>

                <Text>move count: {this.state.moveCount}</Text>

            </View>
        )
    }
}