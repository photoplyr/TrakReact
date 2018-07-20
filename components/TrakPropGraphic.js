/**
 * Created by Nazimov Andrey.
 * Date: 7/17/18
 * Time: 3:36 PM
 */

import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import SvgUri from 'react-native-svg-uri';

const Window = Dimensions.get('window');

export default class TrakPropGraphic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dimensions: {width: 0, height: 0}
        };
        console.log('width: ', (this.width ));
    }

    render() {
        const {progress} = this.props;

        console.log('progress: ', progress);

        return (
            <View onLayout={this.onLayout}>
                <SvgUri height={250} source={require('../assets/images/trak_bar/trak_bar.svg')}/>
                <View left={(this.state.dimensions.width/2)+15} height={`${progress}%`} style={styles.bar}/>
            </View>
        );
    }

    onLayout = event => {
        // if (this.state.dimensions) return // layout was already called
        let {width, height} = event.nativeEvent.layout;
        this.setState({dimensions: {width, height}});
        console.log('---------', event.nativeEvent.layout);
    }
}


const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        bottom: 2,
        backgroundColor: '#ffffff',
        width: 20,
        opacity: 0.9
    }
})