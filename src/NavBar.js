import React, { Component } from "react";
import {View, StyleSheet, Image, TouchableHighlight} from "react-native";

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: "row",
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'green',
        width: '100%',
        justifyContent:'space-between',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});

export default class NavBar extends Component {
    updateState = (newState) => {
        this.props.updateState(newState)
    }
    render() {
        return (
            <View style={styles.buttonRow}>
                <TouchableHighlight activeOpacity={0.2} underlayColor="#cfffc4" onPress={() => this.updateState('userPhoto')}>
                    <Image style={styles.tinyLogo} source={require('../resources/picture.png')} />
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.2} underlayColor="#cfffc4" onPress={() => this.updateState('searchPhoto')}>
                    <Image style={styles.tinyLogo} source={require('../resources/loupe.png')} />
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.2} underlayColor="#cfffc4" onPress={() => this.updateState('Upload')}>
                    <Image style={styles.tinyLogo} source={require('../resources/plus.png')} />
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.2} underlayColor="#cfffc4" onPress={() => this.updateState('favoritePhoto')}>
                    <Image style={styles.tinyLogo} source={require('../resources/star.png')} />
                </TouchableHighlight>
            </View>
        );
    }
}