import React, {PureComponent} from 'react';
import {
  Text,
  View,
} from 'react-native';

import {Button} from 'react-native-elements';

import Touchable from 'react-native-platform-touchable';

import QuizResponses from '../Quiz/QuizResponses';

export default class QuizItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      sent: false,
      input: '',
      response: (new Map(): Map<string, boolean>),
    };
  };

  _setInput = (input) => {
    this.setState((state) => {
      state.input = input;
      return {state};
    });
  };

  _setResponse = (response) => {
    this.setState((state) => {
      state.response = response;
      return {state};
    });
  };

  _onPress = () => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      state.selected = !state.selected;
      return {state};
    });
  };

  _sendResponse = () => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      state.sent = true;
      return {state};
    });
    console.log(this.props.data.id, this.props.data.type.title, this.state.input, this.state.response);
  };

  render() {
    let backgroundColor = this.state.sent ? '#4caf50' : ( this.state.selected ? '#90caf9' : '#2196f3' );
    let displayQuestion = this.state.sent ? 'none' : ( this.state.selected ? 'flex' : 'none' );
    return (
      <View>
        <Touchable
          style={{height: 60, backgroundColor: backgroundColor, margin: 1}}
          onPress={this._onPress}
        >
          <Text style={{lineHeight: 60, textAlign: 'center'}}>
            {this.props.data.title}
          </Text>
        </Touchable>
        <View style={{ display: displayQuestion }}>
          <Text style={{lineHeight: 20, textAlign: 'center', padding: 10}}>
            {this.props.data.question}
          </Text>
          <QuizResponses
            data={this.props.data.responses}
            type={this.props.data.type.title}
            setInput={this._setInput}
            setResponse={this._setResponse}
          />
          <Button
            onPress={this._sendResponse}
            title="Send Response"
            backgroundColor="#4caf50"
            borderRadius={5}
            buttonStyle={{
              height: 45,
              margin: 10,
            }}
          />
        </View>
      </View>
    );
  }
}
