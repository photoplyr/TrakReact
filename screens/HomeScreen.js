import autobind from "autobind-decorator";
import * as React from "react";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Grid from 'react-native-grid-component';
import {StyleSheet, View,Text,ScrollView,FlatList} from "react-native";

import {
     List,Header,NavigationProps
} from "../components/";

import MockDataAPI from "./api";
import SocialAPI from "./api";

import Step from "./components/Step.js";

const data = [
  {
    title: "Steps"
    ,value: 233
  },
  {
    title: "Trak M/mL"
    ,value: 35
  },
  {
    title: "Heart"
    ,value: 90
  }
];


export default class HomeScreen extends React.Component <NavigationProps<>>{

  constructor(props) {
      super(props);
      this.state = {
        data: data
      };
    }

  @autobind
      onPress() {
          const {navigation} = this.props;
          navigation.navigate("HomeScreen");
      }

  static navigationOptions = {
    title: 'Your Things',
  };


  render(): React.Node {

    const todolist = MockDataAPI.todo["todo"][0];
    const me = SocialAPI.me();

    console.log(me);

    const leftAction = {
                icon: "log-out",
                // onPress
            };

    _renderItem = (data, i) => (
       <View style={[{ backgroundColor: data }, styles.griditem]} key={i} />
     );

    _renderPlaceholder = i => <View style={styles.griditem} key={i} />;

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

            <FlatList
                    horizontal
                    data={this.state.data}

                    showsVerticalScrollIndicator={false}

                    renderItem={({ item }) => {
                      return (

                        <View style={styles.listContainer}>
                              <AnimatedCircularProgress
                                size={100}
                                width={15}
                                fill={item.value}
                                tintColor="#00e0ff"
                                onAnimationComplete={() => console.log('onAnimationComplete')}
                                backgroundColor="#3d5875">
                                {
                                  (fill) => (
                                    <Text style={styles.points}>
                                      {item.value}
                                    </Text>
                                  )
                                }
                                </AnimatedCircularProgress>

                                <Text>{item.title}</Text>
                        </View>

                      );
                    }}
                    keyExtractor={(item, index) => "graph-" + index}
                  />

            </View>

            <View style={styles.gridContainer}>
                <Text style={styles.sectionHeader}>DASHBOARD</Text>

                <Grid
                    style={styles.gridlist}
                    renderItem={_renderItem}
                    renderPlaceholder={_renderPlaceholder}
                    data={['#F2F2F2', '#F2F2F2', '#F2F2F2', '#F2F2F2', '#F2F2F2']}
                    itemsPerRow={2}
                  />
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
  }, listContainer: {
    padding: 5,
    backgroundColor: '#fff',
    height: 170,
      alignItems: 'center',
  }, points: {
    alignItems: 'center',
    fontSize: 30,
  }, gridlist: {
    flex: 1,
  },
  griditem: {
    flex: 1,
    height: 160,
    margin: 1
  },gridContainer: {
    paddingLeft: 20,
    backgroundColor: '#fff',
    // height: 370,
  },

});
