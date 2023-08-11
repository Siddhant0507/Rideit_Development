import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Map from '../../src/components/Map';
import {BiCurrentLocation} from 'react-icons/bi';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const HomeScreen = ({navigation}) => {
  const mapRef = useRef(null);

  const [mLat, setMlat] = useState(0);
  const [mLong, setMlong] = useState(0);
  const [marker, setmarker] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const moveToLocation = () => {
    mapRef.current.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      2000,
    );
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Cool Photo App needs access to your Location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setMlat(position.coords.latitude);
        setMlong(position.coords.longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <>
      <View style={{height: '60%', width: '100%'}}>
        <MapView
          ref={mapRef}
          style={{width: '100%', height: '100%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {marker && (
            <Marker
              coordinate={marker}
              title="Your Location"
              description="here are you are"
              identifier="origin"
              image={require('../res/images/user.png')}
            />
          )}
          {/* <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
              title='Your Location'
              18.4604197875968, 73.83491983823866
              description='here are you are'
              identifier='origin' /> */}
          <Marker
            coordinate={{
              latitude: 18.4604197875968,
              longitude: 73.83491983823866,
            }}
            style={{height: 10, width: 20}}
            image={require('../res/images/location.png')}
            title="Pickup & Drop Location"
            description="Pickup and drop your Bike here"
            identifier="origin"
          />
        </MapView>

        <View style={styles.googleAutocomplete}>
          <GooglePlacesAutocomplete
            fetchDetails={true}
            styles={{textInput: styles.input}}
            placeholder="Search your Location"
            onPress={(data, details = null) => {
              setmarker({
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng,
              });
              moveToLocation(
                (latitude = details?.geometry?.location?.lat),
                (longitude = details?.geometry?.location?.lng),
              );
            }}
            query={{
              key: 'AIzaSyAtPscXSljaNjDxGRIucvlr51RyUn1QcOU',
              language: 'en',
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            getCurrentLocation();
          }}
          style={{
            height: 55,
            width: 55,
            backgroundColor: '#fff',
            borderRadius: 20,
            position: 'absolute',
            alignSelf: 'flex-end',
            bottom: 20,
            right: 20,
          }}></TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('RideSelect')}
        style={styles.Ridebutton}>
        <Text style={{fontSize: 18, color: '#fff'}}>Book a Ride</Text>
      </TouchableOpacity>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  googleAutocomplete: {
    alignSelf: 'center',
    width: '90%',
    position: 'absolute',
    paddingHorizontal: 10,
    top: 20,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 5,
    borderRadius: 20,
  },
  input: {
    fontSize: 16,
  },
  Ridebutton:{
    marginVertical:30,
    alignSelf:'center',
    height: 45,
    width: '90%',
    backgroundColor: '#000',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
