import React, { Component } from 'react';
import { Text } from 'react-native';

const cleanData = (data) => {
    data = data.replace("\"data\":[{", "");
    data = data.replace("}]}", "")
    data = data.replace(/{/g, "")
    data = data.replace(/}/g, "")
    return data
}

const parseData = (data) => {
    const regex = /"([a-z_]+)":([-"]([^,]*)[-"]|([^,]*))/g;
    let m;
    let params = {}
    let matches = {}
    let index = 0

    console.log(data)
    while ((m = regex.exec(data)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            matches[groupIndex] = match
        });
        if (matches[1] == "id")
            index++
        if (matches[3] == undefined)
            params[index + matches[1]] = matches[4]
        else
            params[index + matches[1]] = matches[3]
        // console.log(index + matches[1] + ": \"" + params[index + matches[1]] + "\"")
    }
    return params
}

export default class Favorites extends Component {
    state = {
        data: ''

    }
    componentDidMount = () => {
        fetch('https://api.imgur.com/3/account/'+ this.props.username +'/favorites', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.props.accessToken
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                data: parseData(cleanData(JSON.stringify(responseJson)))
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }
    render() {
        let main = <Text>LOADING</Text>

        return (
            <>
                {main}
            </>
        );
    }
}