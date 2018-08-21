import React from 'react';
import { View, WebView, AsyncStorage, Text } from 'react-native';

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
          source={{uri: 'http://trakfertility.tools/api/embed/test/quiz/3'}}
          injectedJavaScript={`Token = '`+ userToken +`'`}
        />
      </View>
    ) : <View style={{flex: 1}}><Text>Loading data</Text></View>;
  };
}
