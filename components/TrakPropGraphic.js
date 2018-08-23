/**
 * Created by Nazimov Andrey.
 * Date: 7/17/18
 * Time: 3:36 PM
 */

import React from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';

const Window = Dimensions.get('window');

export default class TrakPropGraphic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dimensions: {width: 0, height: 0}
        };
    }

    render() {
        const {progress} = this.props;
        return (
            <View onLayout={this.onLayout}>
                <Image style={{height: 250}} resizeMode="contain" source={require('../assets/images/trak_bar/trak_bar.png')}/>
                <View left={(this.state.dimensions.width / 2) + 15} height={`${progress}%`} style={styles.bar}/>
            </View>
        );
    }

    onLayout = event => {
        // if (this.state.dimensions) return // layout was already called
        let {width, height} = event.nativeEvent.layout;
        this.setState({dimensions: {width, height}});
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