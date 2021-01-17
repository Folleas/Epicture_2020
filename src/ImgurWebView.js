import React, { Component } from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';

const parseURLParams = (url) => {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
    while (match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    return params
}

class ImgurWebView extends Component {
    setAccessToken = (token) => {
        this.props.setAccessToken(token);
    }
    setRefreshToken = (token) => {
        this.props.setRefreshToken(token);
    }
    setAccountID = (clientID) => {
        this.props.setAccountID(clientID);
    }
    setUsername = (username) => {
        this.props.setUsername(username);
    }
    onNavigationStateChange = (navigationState: WebViewNavigation) => {
        const url = navigationState.url;
        const params = parseURLParams(url);

        if (params.access_token) {
            this.setAccessToken(params.access_token)
        }
        if (params.refresh_token) {
            this.setRefreshToken(params.refresh_token)
        }
        if (params.account_id) {
            this.setAccountID(params.account_id)
        }
        if (params.account_username) {
            this.setUsername(params.account_username)
        }
    };
    render() {
        return (
            <>
                <WebView
                    source={{ uri: 'https://api.imgur.com/oauth2/authorize?client_id=06ee5a4b7226366&response_type=token' }}
                    onNavigationStateChange={this.onNavigationStateChange}
                />
            </>
        );
    }
}

export default ImgurWebView;