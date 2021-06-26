import * as React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from './Screens/Onboarding';
import {default as storage} from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

const Stack = createStackNavigator();
function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>HOME</Text>
    </View>
  );
}

function App() {
  const [config, setConfig] = React.useState(true);
  // observer(config);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    storage.getItem('onBoarded').then((result) => {
      const val = result != null ? JSON.parse(result) : null;
      const state = val != null ? val.onboard : true;
      setConfig(state);
      setTimeout(() => {
        setLoading(false);
      }, 100);
    });
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{flex: 1, justifyContent: 'center'}}
        color={'#000'}
      />
    );
  } else
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {config && (
              <Stack.Screen
                options={{headerShown: false}}
                name="Onboarding"
                component={Intro}
              />
            )}
            <Stack.Screen options={{}} name="Main" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
}

export default App;
