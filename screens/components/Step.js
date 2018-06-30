// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, Image} from "react-native";

import {Text, StyleGuide,Icon} from "../../components";

type StepProps = {
    index: number,
    step: string
};

export default class Step extends React.PureComponent<StepProps> {

    render(): React.Node {
        const {step, index} = this.props;
        return (
            <View style={styles.container}>

                <Image
                   style={{height: 25,width: 25,marginRight: StyleGuide.spacing.small}}
                    source={require('../../assets/images/unchecked.png')}
                 />

                <Text style={styles.text}>{step}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: StyleGuide.spacing.small
    },
    radio: {
        paddingHorizontal: StyleGuide.spacing.small,
        justifyContent: "center",
    },
    step: {
        marginRight: StyleGuide.spacing.small,
        color: StyleGuide.palette.darkGray
    },
    text: {
        marginRight: StyleGuide.spacing.small
    }
});
