/**
 * Created by Nazimov Andrey.
 * Date: 7/5/18
 * Time: 1:53 PM
 */

import React, {Component} from 'react'
import {
    AsyncStorage,
    StyleSheet,
    ScrollView,
    View,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text
} from 'react-native';
import {Button, Input} from 'react-native-elements'
import ApiService from '../services/ApiService'

export default class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Sign in',
        header: null,
        // header: {visible: false}
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            btnSignIn: {
                isLoading: false,
                title: 'Sign In'
            },
            errorFirstName: null
        };
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                enabled
                style={{flex: 1}}>
                <ScrollView style={styles.container}>

                    <View style={styles.logo}>
                        <Image
                            source={require('../assets/images/trak_logo.png')}
                            style={styles.logoImg}/>
                    </View>

                    <View style={{paddingLeft: 16, paddingRight: 16, width: '100%'}}>

                        <Input
                            placeholder='Email'
                            containerStyle={styles.input}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                            blurOnSubmit={false}
                            returnKeyType={"next"}
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            onSubmitEditing={() => {
                                this.pwdInput.focus();
                            }}
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.errorFirstName}
                        />
                        <Input
                            placeholder='Password'
                            secureTextEntry={true}
                            containerStyle={styles.input}
                            textContentType="password"
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                            ref={(input) => {
                                this.pwdInput = input;
                            }}
                        />

                        <View style={styles.btnContainer}>
                            <Button
                                title={this.state.btnSignIn.title}
                                onPress={this._signInAsync}
                                borderRadius={5}
                                loading={this.state.btnSignIn.isLoading}
                                backgroundColor="#3b98da"
                                buttonStyle={{
                                    height: 45,
                                    margin: 10
                                }}
                            />
                        </View>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')} style={styles.signUpLinkContainer}>
                            <Text style={styles.signUpLinkText}>New here? Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('RecoverPwd')} style={styles.signUpLinkContainer}>
                            <Text style={styles.signUpLinkText}>Forgot password? Recover</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    _signInAsync = async () => {
        if (!this.state.btnSignIn.isLoading) {

            this.setState({btnSignIn: {isLoading: true}});
            const resp = await new ApiService().Auth().signIn(this.state.email, this.state.password, '000')

            console.log('token: ', resp.data);

            if (resp.status == 200) {
                await AsyncStorage.setItem('userToken', resp.data.token);
                this.props.navigation.navigate('App');
            } else {
                this.setState({btnSignIn: {isLoading: false, title: 'Sign In'}});
                alert('Invalid Email or Password.')
            }

        }
    };

    _handleSignUpLink() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        // flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center'
    },
    logo: {
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 30
    },
    logoImg: {
        resizeMode: Image.resizeMode.contain,
        height: 150
    },
    btnContainer: {
        marginTop: 50
    },
    input: {
        // borderColor: '#7a42f4',
        // borderWidth: 1,
        width: '100%'
    },
    signUpLinkContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    signUpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
