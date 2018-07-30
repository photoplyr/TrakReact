/**
 * Created by Nazimov Andrey.
 * Date: 7/26/18
 * Time: 8:50 AM
 */

import React, {Component} from 'react';
import {ScrollView, Image, Text, View, PanResponder, StyleSheet, Dimensions, AsyncStorage, Picker} from 'react-native';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';

import {Button, Input} from 'react-native-elements';
import moment from 'moment-timezone';
import BaseScreen from '../BaseScreen'
import HeaderBackButton from '../../components/HeaderBackButton';


export default class EnterTrakResultScreen extends BaseScreen {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Semen Analysis',
            headerLeft: (
                <HeaderBackButton navigation={navigation}/>
            )
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            language: null
        }
    }

    render() {
        const values = [1, 2, 3, 4, 5];
        const selectedIndex = 2;
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <IndicatorViewPager
                    style={{flex: 1}}
                    // indicator={this._renderDotIndicator()}
                >

                    <View style={{flex: 1}}>

                        <Text style={styles.title}>Enter sperm concentration in million cells per milliliter
                            (M/mL)</Text>



                    </View>

                    {/*<View style={{backgroundColor: '#1AA094'}}>*/}
                    {/*<Text>page three</Text>*/}
                    {/*</View>*/}
                </IndicatorViewPager>
            </View>
        );
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={1}/>;
    }

}


const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        padding: 20,
        fontSize: 20
    }
});