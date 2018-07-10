import React from 'react';
import {
    AsyncStorage,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    FlatList
} from 'react-native';
// import {WebBrowser} from 'expo';
import {ListItem} from 'react-native-elements'
import Grid from 'react-native-grid-component';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
// import Touchable from 'react-native-platform-touchable';
// import {MonoText} from '../components/StyledText';
import Step from '../components/Step'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Trak',
        header: null
    };

    data = [
        {
            title: "Steps"
            , value: 233
        },
        {
            title: "Trak M/mL"
            , value: 35
        },
        {
            title: "Heart"
            , value: 90
        }
    ];

    instructions = [
        {key: "Take risk assessment", checked: false},
        {key: "Test sperm", checked: true},
        {key: "Schedule doctor appointment", checked: false}
    ];

    render() {
        return (
            // Add scroller to view
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                {/*// Add the action container and text header*/}
                <View style={styles.actionPlanContainer}>
                    <Text style={styles.sectionHeader}>ACTION PLAN</Text>
                    <FlatList
                        data={this.instructions}
                        renderItem={({item}) => <Step title={item.key} checked={item.checked}/>}
                    />
                </View>

                {/*// Load the dashboard elements*/}
                <View style={styles.dashboardContainer}>
                    <Text style={styles.sectionHeader}>DASHBOARD</Text>

                    <FlatList
                        numColumns={3}
                        data={this.data}

                        showsVerticalScrollIndicator={false}

                        renderItem={({item}) => {
                            return (

                                <View style={styles.listContainer}>
                                    <AnimatedCircularProgress
                                        size={100}
                                        width={15}
                                        fill={item.value}
                                        tintColor="#00e0ff"
                                        onAnimationComplete={() => console.log('onAnimationComplete')}
                                        backgroundColor="#3d5875">
                                        {
                                            (fill) => (
                                                <Text style={styles.points}>
                                                    {item.value}
                                                </Text>
                                            )
                                        }
                                    </AnimatedCircularProgress>

                                    <Text>{item.title}</Text>
                                </View>

                            );
                        }}
                        keyExtractor={(item, index) => "graph-" + index}
                    />

                </View>

                {/*// load the grid elements*/}
                <View style={styles.gridContainer}>

                    <Grid
                        style={styles.gridlist}
                        renderItem={this._renderItem}
                        renderPlaceholder={this._renderPlaceholder}
                        data={['#F2F2F2', '#F2F2F2', '#F2F2F2', '#F2F2F2']}
                        itemsPerRow={2}
                    />
                </View>

                <Button title="Log Out" onPress={async () => await this._logOut()}/>
            </ScrollView>
        )
        // return (
        //     <View style={styles.container}>
        //         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        //             <View style={styles.welcomeContainer}>
        //                 <Image
        //                     source={
        //                         __DEV__
        //                             ? require('../assets/images/robot-dev.png')
        //                             : require('../assets/images/robot-prod.png')
        //                     }
        //                     style={styles.welcomeImage}
        //                 />
        //             </View>
        //
        //             <View style={styles.getStartedContainer}>
        //                 {this._maybeRenderDevelopmentModeWarning()}
        //
        //                 <Text style={styles.getStartedText}>Get started by opening</Text>
        //
        //                 <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
        //                     <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
        //                 </View>
        //
        //                 <Text style={styles.getStartedText}>
        //                     Change this text and your app will automatically reload.
        //                 </Text>
        //             </View>
        //
        //             <View style={styles.helpContainer}>
        //                 <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
        //                     <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
        //                 </TouchableOpacity>
        //             </View>
        //
        //             <Button
        //                 title="Click me!!"
        //                 onPress={() => this.props.navigation.navigate('Test', {itemId: 77, name: "Andrey"})}
        //             />
        //
        //             <Button title="Log Out" onPress={async ()=> await this._logOut() }/>
        //
        //         </ScrollView>
        //
        //         <View style={styles.tabBarInfoContainer}>
        //             <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>
        //
        //             <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
        //                 <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
        //             </View>
        //         </View>
        //     </View>
        // );
    }

    _renderItem = (data, i) => (
        <View style={[{backgroundColor: data}, styles.griditem]} key={i}>

            <Image
                style={{marginTop: 20, marginBottom: 20, alignItems: 'center', height: '55%', width: '55%'}}
                source={require('../assets/images/heartbeat.png')}
            />

            <Text>{'Heart Rate'}</Text>

        </View>
    );

    _renderPlaceholder = i => <View style={styles.griditem} key={i}/>;

    async _logOut() {
        await AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('Auth');
    }

    // _maybeRenderDevelopmentModeWarning() {
    //     if (__DEV__) {
    //         const learnMoreButton = (
    //             <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
    //                 Learn more
    //             </Text>
    //         );
    //
    //         return (
    //             <Text style={styles.developmentModeText}>
    //                 Development mode is enabled, your app will be slower but you can use useful development
    //                 tools. {learnMoreButton}
    //             </Text>
    //         );
    //     } else {
    //         return (
    //             <Text style={styles.developmentModeText}>
    //                 You are not in development mode, your app will run at full speed.
    //             </Text>
    //         );
    //     }
    // }

    // _handleLearnMorePress = () => {
    //     WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    // };
    //
    // _handleHelpPress = () => {
    //     WebBrowser.openBrowserAsync(
    //         'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    //     );
    // };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: '#fff',
    }, getStartedContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
        marginHorizontal: 50,
    }, contentContainer: {}, actionPlanContainer: {
        paddingLeft: 20,
    }, dashboardContainer: {
        paddingLeft: 20,
        backgroundColor: '#fff',
        height: 170,
    }, sectionHeader: {
        paddingTop: 15,
        fontSize: 24,
        color: "#E08944",
    }, headerHeader: {
        backgroundColor: '#fff',
    }, listContainer: {
        padding: 5,
        backgroundColor: '#fff',
        height: 170,
        alignItems: 'center',
    }, points: {
        alignItems: 'center',
        fontSize: 30,
    }, gridlist: {
        flex: 1,
    },
    griditem: {
        alignItems: 'center',
        flex: 1,
        height: 160,
        margin: 1
    }, gridContainer: {
        margin: 10,
        backgroundColor: '#fff',
    },

});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     developmentModeText: {
//         marginBottom: 20,
//         color: 'rgba(0,0,0,0.4)',
//         fontSize: 14,
//         lineHeight: 19,
//         textAlign: 'center',
//     },
//     contentContainer: {
//         paddingTop: 30,
//     },
//     welcomeContainer: {
//         alignItems: 'center',
//         marginTop: 10,
//         marginBottom: 20,
//     },
//     welcomeImage: {
//         width: 100,
//         height: 80,
//         resizeMode: 'contain',
//         marginTop: 3,
//         marginLeft: -10,
//     },
//     getStartedContainer: {
//         alignItems: 'center',
//         marginHorizontal: 50,
//     },
//     homeScreenFilename: {
//         marginVertical: 7,
//     },
//     codeHighlightText: {
//         color: 'rgba(96,100,109, 0.8)',
//     },
//     codeHighlightContainer: {
//         backgroundColor: 'rgba(0,0,0,0.05)',
//         borderRadius: 3,
//         paddingHorizontal: 4,
//     },
//     getStartedText: {
//         fontSize: 17,
//         color: 'rgba(96,100,109, 1)',
//         lineHeight: 24,
//         textAlign: 'center',
//     },
//     tabBarInfoContainer: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         ...Platform.select({
//             ios: {
//                 shadowColor: 'black',
//                 shadowOffset: {height: -3},
//                 shadowOpacity: 0.1,
//                 shadowRadius: 3,
//             },
//             android: {
//                 elevation: 20,
//             },
//         }),
//         alignItems: 'center',
//         backgroundColor: '#fbfbfb',
//         paddingVertical: 20,
//     },
//     tabBarInfoText: {
//         fontSize: 17,
//         color: 'rgba(96,100,109, 1)',
//         textAlign: 'center',
//     },
//     navigationFilename: {
//         marginTop: 5,
//     },
//     helpContainer: {
//         marginTop: 15,
//         alignItems: 'center',
//     },
//     helpLink: {
//         paddingVertical: 15,
//     },
//     helpLinkText: {
//         fontSize: 14,
//         color: '#2e78b7',
//     },
// });
