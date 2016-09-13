'use strict';

import React, {StyleSheet, Text, View, Component} from 'react-native';
import Button from 'react-native-button';
import CookieManager from 'react-native-cookies';
import ReactNativeLogin from './App'

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    };
  }

  logout () {
    CookieManager.clearAll((err, res) => {
      console.log(err);
      console.log(res);
    });

    this.setState({
      loggedIn: false,
    });
  }


  async _getMoviesFromApi (a) {
    console.log(a)
    try {
      let response = await fetch('http://localhost:4000/');
      let responseJson = await response.json();
      console.log(responseJson)
      return responseJson.movies;
    } catch(error) {
      console.error(error);
    }
  }

  render () {
    if (this.state.loggedIn) {
      this._getMoviesFromApi("a")
     return (
       <View style={styles.container}>
         <Text style={styles.welcome}>
           You are authenticated!
         </Text>
         <Button style={{color: 'black'}} onPress={this.logout.bind(this)}>Logout</Button>
       </View>
     );
    }
    else {
      return (
        <ReactNativeLogin/>
      );
    }

  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
