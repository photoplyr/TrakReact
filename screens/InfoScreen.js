import React from 'react';
import {WebView, ActivityIndicator, StyleSheet, View, Alert, Linking} from 'react-native';

export default class InfoScreen extends React.Component {
    static navigationOptions = {
        title: 'Info',
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false
        };
    };

    render() {
        let jsCodeURLHandler = `function onClickHandler(e){new RegExp("^http?://"+location.host,"gi").test(this.href)||(e.preventDefault(),window.postMessage(JSON.stringify({external_url_open:this.href})))}; setInterval(function(){!function(){var e=function(e,n,t){if(n=n.replace(/^on/g,""),"addEventListener"in window){e.removeEventListener(n,t); e.addEventListener(n,t,!1);}else if("attachEvent"in window)e.attachEvent("on"+n,t);else{var o=e["on"+n];e["on"+n]=o?function(e){o(e),t(e)}:t}return e},n=document.querySelectorAll("a[href]");if(n)for(var t in n)n.hasOwnProperty(t)&&e(n[t],"onclick",onClickHandler)}();},1000);`;

        return (
            <View style={styles.container}>
                <WebView
                    source={{uri: 'http://www.trakfertility.com/app_main/'}}
                    injectedJavaScript={`${jsCodeURLHandler}`}
                    javaScriptEnabled={true}
                    onMessage={this.onMessage.bind(this)}
                    onLoadEnd={() => this.setState({isLoaded: true})}
                />

                {!this.state.isLoaded ? <View style={{position: 'absolute'}}>
                    <ActivityIndicator size="large"/>
                </View> : null}

            </View>
        );
    }


    onMessage(e) {
        // retrieve event data
        let data = e.nativeEvent.data;
        // maybe parse stringified JSON
        try {
            data = JSON.parse(data)
        } catch (e) {
        }

        // check if this message concerns us
        if ('object' == typeof data && data.external_url_open) {
            // proceed with URL open request
            return Alert.alert(
                'External URL',
                'Do you want to open this URL in your browser?',
                [
                    {text: 'Cancel', style: 'cancel'},
                    {text: 'OK', onPress: () => Linking.openURL(data.external_url_open)},
                ],
                {cancelable: false}
            );
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});