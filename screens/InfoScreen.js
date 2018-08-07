import React from 'react';
import { WebView } from 'react-native';

export default class InfoScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
      header: null
  };

  render() {
    return (
      <WebView
        source={{uri: 'http://www.trakfertility.net/app_main/'}}
      />
    );
  }
}
