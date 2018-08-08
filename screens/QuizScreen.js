import React from 'react';
import { WebView, AsyncStorage } from 'react-native';

let userToken = AsyncStorage.getItem('userToken');

export default class QuizScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
      header: null
  };

  render() {
    return (
      <WebView
        source={{uri: 'https://trakfertility.tools/api/embed/test/quiz/2'}}
        injectedJavaScript={'(var Token = "'+ userToken +'");'}
      />
    );
  }
}
