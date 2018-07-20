import React, {PureComponent} from 'react';
import {
  // Text,
  // View,
  FlatList,
} from 'react-native';

import {Button, CheckBox, Input} from 'react-native-elements';

class QuizResponse extends PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    let checkedIcon = this.props.type === 'Radio' ? 'dot-circle-o' : 'check-square-o';
    let uncheckedIcon = this.props.type === 'Radio' ? 'circle-o' : 'square-o';
    return (
      <CheckBox
        center
        checkedIcon={checkedIcon}
        uncheckedIcon={uncheckedIcon}
        onPress={this._onPress}
        title={this.props.title}
        checked={this.props.checked}
      />
    );
  }
}

export default class QuizResponses extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: (new Map(): Map<string, boolean>),
    };
  }

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      let checked = null;
      if ( this.props.type === 'Radio' ){
        checked = (new Map(): Map<string, boolean>);
      } else {
        checked = new Map(state.checked);
      }
      checked.set(id, !checked.get(id)); // toggle
      this.props.setResponse(checked);
      return {checked};
    });
  };

  _keyExtractor = (item, index) => 'quiz_response_' + item.id;

  _renderItem = ({item}) => (
    <QuizResponse
      id={item.id}
      title={item.title}
      type={this.props.type}
      onPressItem={this._onPressItem}
      checked={!!this.state.checked.get(item.id)}
    />
  );

  _setInput = ({input}) => {
    this.props.setInput(input);
  };

  render() {
    if ( this.props.type == 'Input' ) {
      return (
        <Input
          placeholder='Enter your answer'
          containerStyle={{margin: 10}}
          value=''
          onChangeText={(input) => this._setInput({input})}
        />
      );
    } else {
      return (
        <FlatList
          type={this.props.type}
          data={this.props.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }
  }
}
