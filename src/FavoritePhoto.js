import React, { Component } from 'react';
import APICall from "./APICall";
import {Image, Text, StyleSheet, SafeAreaView, ScrollView} from "react-native";

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

export default class FavoritePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: '',
            username: '',
            data: '',
        };
    }
    setData = tmp => {
        if (tmp) {
            this.setState({
                data: tmp
            })
            console.log(tmp);
            this.forceUpdate();
        }
    }
    render() {
        let main
        if (this.props.accessToken == '')
            this.state.accessToken = this.props.refreshToken;
        else
            this.state.accessToken = this.props.accessToken
        this.state.username = this.props.username
        if (this.state.data == '') {
            main = <APICall apiPath={'https://api.imgur.com/3/account/'+ this.state.username +'/favorites'} method={'GET'} authorization={'Bearer ' + this.state.accessToken} setData={this.setData}/>
        }
        else {
            let links = []
            this.state.data.map((item, index) => {
                if (item.cover != undefined)
                    links.push(item.cover)
            })
            let path = "https://i.imgur.com/"
            main = links.map((item, index) => <Image style={styles.logo} key={index} source={{ uri:path+item+".jpg"}}></Image>)
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