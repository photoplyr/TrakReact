/**
 * Created by Nazimov Andrey.
 * Date: 7/5/18
 * Time: 1:53 PM
 */

import React, {Component} from 'react'
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    ScrollView,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Input} from 'react-native-elements'
import ApiService from '../services/ApiService'

export default class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Please sign in',
        header: null,
        // header: {visible: false}
    };

    constructor(props) {
        super(props);
        this.state = {
            email: 'Useless Placeholder ',
            btnSignIn: {
                isLoading: false,
                title: 'Sign In'
            }
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={178}

                    behavior="padding"
                >


                    <View style={styles.logo}>
                        <Image
                            source={require('../assets/images/trak_logo.png')}
                            style={styles.logoImg}/>
                    </View>


                    <View style={{paddingLeft: 16, paddingRight: 16, width: '100%'}}>

                        <Input
                            placeholder='Email'
                            containerStyle={styles.input}
                        />
                        <Input
                            placeholder='Password'
                            secureTextEntry={true}
                            containerStyle={styles.input}
                        />


                        <View style={styles.btnContainer}>
                            <Button
                                title={this.state.btnSignIn.title}
                                onPress={this._signInAsync}
                                borderRadius={5}
                                loading={this.state.btnSignIn.isLoading}
                                backgroundColor="#3b98da"
                                buttonStyle={{
                                    height: 45
                                }}
                            />
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </View>
        );
    }

    _signInAsync = async () => {
        if (!this.state.btnSignIn.isLoading) {

            this.setState({btnSignIn: {isLoading: true}});
            const resp = await new ApiService().signIn('test@test.com', '12345678', '000')


            if (resp.status == 200) {
                this.setState({btnSignIn: {isLoading: false, title: 'Done'}});
                alert('OK')
            } else {
                this.setState({btnSignIn: {isLoading: false, title: 'Sign In'}});
                alert('Invalid Email or Password.')
            }
            // await AsyncStorage.setItem('userToken', 'abc');
            // this.props.navigation.navigate('App');
        }
    };
}

const styles = StyleSheet.create({
    logo: {
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 30
    },
    logoImg: {
        resizeMode: Image.resizeMode.contain,
        height: 150
    },
    container: {
        flex: 1,
        // flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center'
    },
    btnContainer: {
        marginTop: 50
    },
    input: {
        // borderColor: '#7a42f4',
        // borderWidth: 1,
        width: '100%'
    }
});