import React, { useRef } from "react";
import { TextInput, View, StyleSheet, Button} from "react-native";

const SearchPhoto = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
        }).start();
    };
    fadeIn()
    return (
        <View style={styles.container}>
            <Animated.View style={{opacity: fadeAnim}}>
                <TextInput style={styles.textinput} color={'green'} placeholder='Entrez un Tag' />
                <Button title='Rechercher' color={'green'} onPress={() => {}}/>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "black"
    },
    fadingContainer: {
        marginVertical: 10
    },
    textinput: {
        marginTop: 50,
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: 'green',
        borderWidth: 1,
        paddingLeft: 5
    },
    buttonRow: {
        flexDirection: "row",
        marginTop: 531
    }
});


export default SearchPhoto;
