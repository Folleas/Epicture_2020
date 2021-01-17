import React, { Component } from 'react';
import {Text} from 'react-native'

const cleanData = (data) => {
    if (data) {
        data = data.replace("\"data\":[{", "");
        data = data.replace("}]}", "")
        data = data.replace(/{/g, "")
        data = data.replace(/}/g, "")
    }
    return data
}

const parseData = (data) => {
    const regex = /"([a-z_]+)":([-"]([^,]*)[-"]|([^,]*))/g;
    let m;
    let params = []
    let matches = {}

    while ((m = regex.exec(data)) !== null) {
        let tmp = {};
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            matches[groupIndex] = match
        });
        if (matches[3] == undefined)
            tmp[matches[1]] = matches[4]
        else
            tmp[matches[1]] = matches[3]
        params.push(tmp);
    }
    return params
}

export default class APICall extends Component {
    setData = (data) => {
        if (data)
            this.props.setData(data);
    }
    componentDidMount = () => {
        fetch(this.props.apiPath, {
            method: this.props.method,
            headers: {
                Authorization: this.props.authorization
            },
            body: this.props.body
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setData(parseData(cleanData(JSON.stringify(responseJson))));
        })
        .catch((error) => {
            console.error(error);
        });
    }
    render() {
        return (
            <>
                <Text>Loading...</Text>
            </>
        );
    }
}

export {parseData, cleanData};