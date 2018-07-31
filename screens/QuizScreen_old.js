import React from 'react';
import { ScrollView, View } from 'react-native';

import QuizList from '../components/Quiz/QuizList';

var customerQuizData = require('../api/quiz.json');

var styles = require('../assets/style/style').styles;

export default class QuizScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
      header: null
  };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <QuizList data={customerQuizData} />
      </ScrollView>
    );
  }
}
