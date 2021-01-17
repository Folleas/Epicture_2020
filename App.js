/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import ImgurWebView from "./src/ImgurWebView";
import NavBar from "./src/NavBar"
import UserPhoto from "./src/UserPhoto"
import FavoritePhoto from "./src/FavoritePhoto"
import SearchPhoto from "./src/SearchPhoto"
import Upload from "./src/Upload"
import StartPage from "./src/StartPage"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: '',
            refreshToken: '',
            accountID: '',
            username: '',
            currentState: 'startScreen',
            navBar: <></>,
        };
    }
    setAccessToken = (childAccessToken) => {
        if (childAccessToken)
            this.state.accessToken = childAccessToken;
    }
    setRefreshToken = (childRefreshToken) => {
        if (childRefreshToken)
            this.state.refreshToken = childRefreshToken;
    }
    setUsername = (childUsername) => {
        if (childUsername)
            this.state.username = childUsername;
    }
    setAccountID = (childAccountID) => {
        if (childAccountID) {
            this.state.accountID = childAccountID;
            this.setCurrentState('userPhoto')
            this.state.navBar = <NavBar updateState={this.setCurrentState}/>
            this.forceUpdate();
        }
    }
    setCurrentState = (newState) => {
        this.state.currentState = newState;
        this.forceUpdate();
    }
    render() {
        let displayed;
        switch (this.state.currentState) {
            case 'startScreen':
                displayed = <StartPage updateState={this.setCurrentState}/>
                break;
            case 'webView':
                displayed = <ImgurWebView setAccessToken={this.setAccessToken} setRefreshToken={this.setRefreshToken} setAccountID={this.setAccountID} setUsername={this.setUsername}/>
                break;
            case 'userPhoto':
                displayed = <UserPhoto accessToken={this.state.accessToken} refreshToken={this.state.refreshToken}/>
                break;
            case 'favoritePhoto':
                displayed = <FavoritePhoto accessToken={this.state.accessToken} refreshToken={this.state.refreshToken} username={this.state.username}/>
                break;
            case 'Upload':
                displayed = <Upload clientID={this.state.accountID} accessToken={this.props.accessToken} refreshToken={this.state.refreshToken}/>
                break;
            case 'searchPhoto':
                displayed = <SearchPhoto/>
                break;
        }
        return (
            <>
                {displayed}
                {this.state.navBar}
            </>
        );
    }
}

export default App;