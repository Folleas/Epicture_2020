import React, { Component } from 'react';
import APICall from "./APICall";
import {Image, StyleSheet, SafeAreaView, ScrollView} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "black"
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom:50,
    },
});

export default class UserPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: '',
            data: '',
        };
    }
    setData = tmp => {
        if (tmp) {
            this.setState({
                data: tmp
            })
            this.forceUpdate();
        }
    }
    render() {
        let main
        if (this.props.accessToken == '') {
            console.log("in here");
            this.state.accessToken = this.props.refreshToken;
        }
        else
            this.state.accessToken = this.props.accessToken;
        if (this.state.data == '') {
            main = <APICall apiPath={'https://api.imgur.com/3/account/me/images'} method={'GET'} authorization={'Bearer ' + this.state.accessToken} setData={this.setData}/>
        }
        else {
            let links = []
            this.state.data.map((item, index) => {
                if (item.link != undefined)
                    links.push(item.link)
            })
            main = links.map((item, index) => <Image style={styles.logo} key={index} source={{ uri:item}}></Image>)
        }
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                {main}
                </ScrollView>
            </SafeAreaView>
        );
    }
}