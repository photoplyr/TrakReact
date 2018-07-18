'use strict';

var React = require('react-native');

var {
    StyleSheet,
} = React;


export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        backgroundColor: '#fff',
    }, getStartedContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
        marginHorizontal: 50,
    }, contentContainer: {}, actionPlanContainer: {
        paddingLeft: 20,
    }, headerContainer: {
        paddingLeft: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
        fontSize: 24,
        color: "#E08944",
    }, graphContainer: {
        backgroundColor: '#fff',
        height: 130,
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
        // height: 170,
        flex: 1,
        alignItems: 'center',
    }, points: {
        alignItems: 'center',
        fontSize: 30,
    }, gridlist: {
        flex: 1,
    }, gridText: {
        fontSize: 18,
        color: '#404040'
    }, griditem: {
        alignItems: 'center',
        flex: 1,
        height: 160
    }, gridContainer: {
        margin: 10,
        backgroundColor: '#fff',
    },
    drawerMenuIcon: {
        marginTop: 1
    }
});
