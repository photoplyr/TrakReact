/**
 * Created by Nazimov Andrey.
 * Date: 7/9/18
 * Time: 5:58 PM
 */

import * as React from "react";
import {StyleSheet, View, Image, Text} from "react-native";


export default class Step extends React.PureComponent {

    render() {
        const {title, checked} = this.props;
        return (
            <View style={styles.container}>
                <Image
                    style={{height: 25, width: 25, marginRight: 10}}
                    source={checked ?
                        require('../assets/images/components/checked.png') :
                        require('../assets/images/components/unchecked.png')}
                />

                <Text style={styles.text}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5
    },
    radio: {
        paddingHorizontal: 5,
        justifyContent: "center",
    },
    step: {
        marginRight: 5,
        color: '#404040'
    },
    text: {
    fontSize: 18,
        color: '#404040'
    }
});