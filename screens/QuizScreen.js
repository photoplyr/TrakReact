import React from 'react';
import { View, WebView, AsyncStorage } from 'react-native';

let userToken = null;

export default class QuizScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
      header: null
  };

  constructor(props) {
    super(props);

    this.state = { done: false };
  };

  async componentDidMount() {
    userToken = await AsyncStorage.getItem('userToken');
    this.setState((state) => {
      state.done = true;
      return {state};
    });
  };

  render() {
    return this.state.done ? (
      <View style={{flex: 1}}>
        <WebView
          source={{uri: 'https://trakfertility.tools/api/embed/test/quiz/2'}}
          injectedJavaScript={`Token = '`+ userToken +`'`}
        />
      </View>
    ) : <View style={{flex: 1}}>Loading data</View>;
  };
}
