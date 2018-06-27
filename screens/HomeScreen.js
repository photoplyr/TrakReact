import autobind from "autobind-decorator";
import * as React from "react";

import {StyleSheet, View,Text,ScrollView} from "react-native";

import {
    Container, Header, NavigationBar, DetailsBar, Content, List, Button, ActionSheet, StyleGuide, notImplementedYet
} from "../components/";

import MockDataAPI from "./api";

import Step from "./components/Step.js";

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Me',
  };

  render(): React.Node {

    const recipe = MockDataAPI.recipes["vegetarian"][0];

    console.log(recipe);

    return (
       <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      // <Container>
            <Content style={styles.gutter}>
            <List rows={recipe.instructions} renderRow={(step, i) => <Step index={i + 1} {...{step}} />} />

            </Content>

          // </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  }, getStartedContainer: {
     backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    marginHorizontal: 50,
  },contentContainer: {
    paddingTop: 10,
  }, actionPlanContainer: {
    paddingLeft: 20,
  }, sectionHeader: {
    fontSize: 24,
  },
});
