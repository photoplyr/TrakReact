import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';

import QuizItem from '../Quiz/QuizItem';

export default class QuizList extends PureComponent {
  _keyExtractor = (item, index) => 'quiz_' + item.id;

  _renderItem = ({item}) => (
    <QuizItem
      id={item.id}
      data={item}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
