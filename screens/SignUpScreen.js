/**
 * Created by Nazimov Andrey.
 * Date: 7/9/18
 * Time: 3:11 PM
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
import _ from 'lodash'

import ApiService from '../services/ApiService'

export default class SignUpScreen extends Component {
    static navigationOptions = {
        title: 'Sign Up',
        header: null,
        // header: {visible: false}
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
            btnSignUp: {
                isLoading: false,
                title: 'Sign Up'
            },
            // must be NULL bu default
            errorFirstName: null,
            errorLastName: null,
            errorEmail: null,
            errorPwd: null,
            errorPwd2: null
        };
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={{flex: 1}}>
                <ScrollView style={styles.container}>

                    <View style={styles.logo}>
                        <Image
                            source={require('../assets/images/trak_logo.png')}
                            style={styles.logoImg}/>
                    </View>


                    <View style={{paddingLeft: 16, paddingRight: 16, width: '100%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Input
                                placeholder='First Name'
                                containerStyle={{width: "50%"}}
                                value={this.state.firstName}
                                onChangeText={(firstName) => this.setState({firstName})}
                                errorStyle={{color: 'red'}}
                                errorMessage={this.state.errorFirstName}
                                blurOnSubmit={false}
                                returnKeyType={"next"}
                                onSubmitEditing={() => {
                                    this.lastNameInput.focus();
                                }}
                            />
                            <Input
                                placeholder='Last Name'
                                containerStyle={{width: "50%"}}
                                value={this.state.lastName}
                                onChangeText={(lastName) => this.setState({lastName})}
                                errorStyle={{color: 'red'}}
                                errorMessage={this.state.errorLastName}
                                blurOnSubmit={false}
                                returnKeyType={"next"}
                                onSubmitEditing={() => {
                                    this.emailInput.focus();
                                }}
                                ref={(input) => {
                                    this.lastNameInput = input;
                                }}
                            />
                        </View>

                        <Input
                            placeholder='Email'
                            containerStyle={styles.input}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.errorEmail}

                            blurOnSubmit={false}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                this.pwdInput.focus();
                            }}
                            ref={(input) => {
                                this.emailInput = input;
                            }}
                        />
                        <Input
                            placeholder='Password'
                            secureTextEntry={true}
                            containerStyle={styles.input}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.errorPwd}

                            blurOnSubmit={false}
                            returnKeyType={"next"}
                            onSubmitEditing={() => {
                                this.pwd2Input.focus();
                            }}
                            ref={(input) => {
                                this.pwdInput = input;
                            }}
                        />
                        <Input
                            placeholder='Repeat Password'
                            secureTextEntry={true}
                            containerStyle={styles.input}
                            value={this.state.repeatPassword}
                            onChangeText={(repeatPassword) => this.setState({repeatPassword})}
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.errorPwd2}

                            ref={(input) => {
                                this.pwd2Input = input;
                            }}
                        />


                        <View style={styles.btnContainer}>
                            <Button
                                title={this.state.btnSignUp.title}
                                onPress={this._signUpAsync}
                                borderRadius={5}
                                loading={this.state.btnSignUp.isLoading}
                                backgroundColor="#3b98da"
                                buttonStyle={{
                                    height: 45,
                                    margin: 10
                                }}
                            />
                        </View>

                        <View>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.signUpLinkContainer}>
                            <Text style={styles.signUpLinkText}>I have an account</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    _signUpAsync = async () => {
        this._clearInputErrorMessages();

        if (this._validateForm()) {
            return false;
        }

        if (!this.state.btnSignUp.isLoading) {
            this.setState({btnSignUp: {isLoading: true}});

            const resp = await new ApiService().Auth().signUp(this.state.firstName, this.state.lastName, this.state.email, this.state.password, '000000', 'coach', '000', null)
            console.log(resp);

            if (resp.status == 200) {
                await AsyncStorage.setItem('userToken', resp.data.token);
                this.props.navigation.navigate('App');
            } else if (resp.status == 422) {
                if (resp.data.errors) {
                    const errors = resp.data.errors;
                    for (const key in errors) {
                        switch (key) {
                            case 'email':
                                this.setState({errorEmail: errors[key][0]});
                                break;
                            case 'password':
                                this.setState({errorPwd: errors[key][0]});
                                break;
                            case 'first_name':
                                this.setState({errorFirstName: errors[key][0]});
                                break;
                            case 'last_name':
                                this.setState({errorLastName: errors[key][0]});
                                break;
                        }
                    }
                }
            } else {
                alert('Failed Sign Up. Try again!')
            }
            this.setState({btnSignUp: {isLoading: false, title: 'Sign Up'}});
        }
    };

    _validateForm() {
        let isError = false;

        if (_.size(this.state.firstName.trim()) == 0) {
            this.setState({errorFirstName: 'This field is required.'});
            isError = true;
        }

        if (_.size(this.state.lastName.trim()) == 0) {
            this.setState({errorLastName: 'This field is required.'});
            isError = true;
        }

        if (_.size(this.state.email.trim()) == 0) {
            this.setState({errorEmail: 'This field is required.'});
            isError = true;
        }

        if (_.size(this.state.password) < 6) {
            this.setState({errorPwd: 'The password must be at least 6 characters.'});
            isError = true;
        }

        if (this.state.password != this.state.repeatPassword) {
            this.setState({errorPwd2: 'Password does not match'});
            isError = true;
        }

        return isError;
    }

    _clearInputErrorMessages() {
        this.setState({errorEmail: null});
        this.setState({errorPwd: null});
        this.setState({errorPwd2: null});
        this.setState({errorFirstName: null});
        this.setState({errorLastName: null});
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