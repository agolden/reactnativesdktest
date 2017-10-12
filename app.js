/*
 * Copyright (c) 2017-present, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    FlatList,
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import {oauth, net} from 'react-native-force';

class UserListScreen extends React.Component {
    static navigationOptions = {
        title: 'Mobile SDK Sample App'
    };

    constructor(props) {
        super(props);
        this.state = {data: [], showError: false, showSuccess: false};
    }

    fetchData() {
        var that = this;
        net.query('SELECT Id, Name FROM User LIMIT 10',
                  (response) => that.setState({data: response.records})
                 );
    }

    onLogin() {
      var that = this;
      oauth.getAuthCredentials(
          () => that.fetchData(), // already logged in
          () => {
              oauth.authenticate(
                  function handleSuccess() {
                    this.setState({data: [], showError: false, showSuccess: true});
                  },
                  function handleError(error) {
                    console.log('Failed to authenticate:' + error);
                    this.setState({data: [], showError: true, showSuccess: false});
                  }
              );
          });
    }

    render() {

      let errorMessage = this.state.showError ? <Text style={{color: 'red'}}>You were unable to log in!</Text> : null;
      let successMessage = this.state.showSuccess ? <Text style={{color: 'green'}}>You were able to log in!</Text> : null;
      return (
        <View>
          <View style={{backgroundColor: 'grey'}}>
            <Button title="Login" onPress={this.onLogin.bind(this)}/>
          </View>
          {successMessage}
          {errorMessage}
        </View>

      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});

export const App = StackNavigator({
    UserList: { screen: UserListScreen }
});
