import React from 'react';
import { WebView } from 'react-native';

export default class QuizScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
      header: null
  };

  render() {
    return (
      <WebView
        source={{uri: 'https://trakfertility.tools/api/embed/test/quiz/2'}}
      />
    );
  }
}
