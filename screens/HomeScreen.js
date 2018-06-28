import autobind from "autobind-decorator";
import * as React from "react";

import {StyleSheet, View,Text,ScrollView} from "react-native";

import {
     List,Header
} from "../components/";

import MockDataAPI from "./api";
import SocialAPI from "./api";

import Step from "./components/Step.js";

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Your Things',
  };

  render(): React.Node {

    const todolist = MockDataAPI.todo["todo"][0];
    const me = SocialAPI.me();

    console.log(me);

    return (

       <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

       <Header picture={me.cover} heightRatio={.5}>
       </Header>

        <View style={styles.actionPlanContainer}>

            <Text style={styles.sectionHeader}>ACTION PLAN</Text>

            <List rows={todolist.instructions} renderRow={(step, i) => <Step index={i + 1} {...{step}} />} />

        </View>

        <View style={styles.dashboardContainer}>
            <Text style={styles.sectionHeader}>DASHBOARD</Text>

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
  }, getStartedContainer: {
     backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    marginHorizontal: 50,
  },contentContainer: {
    // paddingTop: 10,
  }, actionPlanContainer: {
    paddingLeft: 20,
  }, dashboardContainer: {
    paddingLeft: 20,
    backgroundColor: '#fff',
    height: 170,
  }, sectionHeader: {
    paddingTop: 15,
    fontSize: 24,
    color: "#E08944",
  }, headerHeader: {
      backgroundColor: '#fff',
  },


});
