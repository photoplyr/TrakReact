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
    Text,
    Alert
} from 'react-native';
import {Button, Input} from 'react-native-elements'
import ApiService from '../services/ApiService'

export default class RecoverPwdScreen extends Component {
    static navigationOptions = {
        title: 'Recover Password',
        header: null,
        // header: {visible: false}
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            btnSignIn: {
                isLoading: false,
                title: 'Send'
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

                    <Text style={{textAlign: 'center', marginBottom: 10}}>Enter the email address you use to sign in to
                        Trak</Text>

                    <View style={{paddingLeft: 16, paddingRight: 16, width: '100%'}}>

                        <Input
                            placeholder='Email'
                            containerStyle={styles.input}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email})}
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            onSubmitEditing={this._recoverAsync}
                            errorStyle={{color: 'red'}}
                            errorMessage={this.state.errorFirstName}
                        />


                        <View style={styles.btnContainer}>
                            <Button
                                title={this.state.btnSignIn.title}
                                onPress={this._recoverAsync}
                                borderRadius={5}
                                loading={this.state.btnSignIn.isLoading}
                                backgroundColor="#3b98da"
                                buttonStyle={{
                                    height: 45,
                                    margin: 10
                                }}
                            />
                        </View>

                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                          style={styles.signUpLinkContainer}>
                            <Text style={styles.signUpLinkText}>I remembered my password</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    _recoverAsync = async () => {
        if(this.state.email.trim().length === 0)
            return false;

        if (!this.state.btnSignIn.isLoading) {

            this.setState({btnSignIn: {isLoading: true}});
            const resp = await new ApiService().Auth().recoverPwd(this.state.email);

            console.log('resp: ', resp);

            if (resp.status === 200) {
                this.setState({btnSignIn: {isLoading: false, title: 'Send'}});
                Alert.alert(
                    'Trak',
                    'We have e-mailed your password reset link!',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.goBack()},
                    ],
                    {cancelable: false}
                );

            } else if (resp.status === 404) {
                this.setState({btnSignIn: {isLoading: false, title: 'Send'}});

                Alert.alert(
                    'Trak',
                    'We can\'t find a user with that e-mail address.',
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: true}
                );

            } else {
                this.setState({btnSignIn: {isLoading: false, title: 'Send'}});
                Alert.alert(
                    'Trak',
                    'The request failed. Try again!',
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: true}
                );
            }

        }
    };

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
