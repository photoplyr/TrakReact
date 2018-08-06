/**
 * Created by Nazimov Andrey.
 * Date: 7/26/18
 * Time: 8:50 AM
 */

import React, {Component} from 'react';
import {ScrollView, Text, View, StyleSheet, Dimensions, AsyncStorage, Alert} from 'react-native';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import NumericInput, {calcSize} from 'react-native-numeric-input'
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
            language: null,
            value: 15
        }
    }

    componentWillUnmount() {
        const {params} = this.props.navigation.state;
        params.callUpdate();
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


                        <View style={styles.btnControlContainer}>
                            <NumericInput
                                value={this.state.value}
                                onChange={value => this.setState({value})}
                                totalWidth={240}
                                totalHeight={50}
                                iconSize={25}
                                step={0.5}
                                valueType='real'
                                minValue={0}
                                maxValue={100}
                                textColor='#000000'
                                iconStyle={{color: '#000000'}}
                                // rightButtonBackgroundColor='#EA3788'
                                // leftButtonBackgroundColor='#E56B70'
                            />
                        </View>

                        <View style={styles.bottomContainer}>
                            <Text style={styles.bottomText}>Sperm concentration measures the amount of sperm in each
                                milliliter of semen. If you report only provides total sperm count, you can calculate
                                the sperm concentration by dividing the total count by semen volume. If your report
                                simply says sperm count you may want to call the lab to clarify if it is reporting the
                                concentration or the total count.</Text>

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

    _add = async () => {

        if (this.state.value <= 0) {
            return false;
        }

        const listRaw = await AsyncStorage.getItem('trak_result');
        const list = listRaw == null ? [] : JSON.parse(listRaw);

        list.push({
            key: new Date().getTime().toString(),
            date: moment().format(),
            result: 'manually',
            value: this.state.value
        });

        await AsyncStorage.setItem('trak_result', JSON.stringify(list));
        this.props.navigation.goBack();
    }
}


const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        padding: 20,
        fontSize: 20
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        marginBottom:10
    },
    bottomText: {
        marginTop: 10,
        marginLeft: 16,
        marginRight: 16,
        fontSize: 14,
        textAlign: 'justify'
    },
    btnControlContainer: {
        position: 'absolute',
        flex: 1,
        right: 0,
        left: 0,
        margin: 15,
        top: 0,
        bottom: 100,
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        // alignContent:'center',
        // backgroundColor: '#05ff72'
    },
});