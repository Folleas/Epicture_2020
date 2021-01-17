import React from "react";
import { Text, View, StyleSheet, Button, Image, Dimensions} from "react-native";

class StartPage extends React.Component {
    render() {
      const size = (Dimensions.get('screen').width + 1000) / (-7);
      const large = (Dimensions.get('screen').height / 5);

      return (
          <View style={styles.container}>
              <Text style={{ marginTop:40, fontSize: 25, color:'white', textDecorationLine:'underline', textDecorationStyle: 'dashed'}}>- Epicture -</Text>
              <View style={[styles.fadingContainer]}>
                  <Image style={{marginLeft:5, width: 350, height: large}} source={require('../resources/igur.gif')} />
                  <Text style={{ textAlign:"center", marginTop:50, fontSize: 20, color:'lightgreen'}}>Welcome to our browsing and photo finder app, please click here to sign in</Text>
                  <Text style={{ textAlign:"center", marginTop:20, fontSize: 20, color:'lightgreen'}}>▼</Text>
                      <View style={{ marginTop:100, marginLeft:115, width:120}}>
                          <Button title="Sign in" color="green" onPress={() => {this.props.updateState('webView')}} />
                      </View>
              </View>
          </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
    fadingContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 26,
    marginTop : 50
  }
});

export default StartPage;
