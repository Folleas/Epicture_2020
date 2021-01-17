import React, { Component } from 'react';
import {Button, View, StyleSheet, Text} from "react-native";
import ImagePicker from 'react-native-image-picker'
import APICall from "./APICall";

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

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: <Text></Text>,
            accesToken: '',
        };
    }
    setData = tmp => {
        if (tmp) {
            console.log(tmp);
        }
    }
    handleChoosePhoto = () => {
        const options = {
        }
        if (this.props.accessToken == '')
            this.state.accessToken = this.props.refreshToken;
        else
            this.state.accessToken = this.props.accessToken
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                console.log(response.uri + " " + response.fileName + " " + response.type)
                let uploadData = new FormData();
                uploadData.append('image', response.data);
                console.log(this.props.accessToken)
                this.state.api = <APICall apiPath={'https://api.imgur.com/3/image'} method={'POST'} authorization={'Bearer ' + this.state.accessToken} body={uploadData} setData={this.setData}/>
                this.forceUpdate();
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Upload</Text>
                {this.state.api}
                <Button color="green" title="Choose Photo" onPress={() => this.handleChoosePhoto()} />
            </View>
        );
    }
}