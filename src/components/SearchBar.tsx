"use strict";

import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Text, Platform } from "react-native";

// import Geolocation from "@react-native-community/geolocation";

// Geolocation.getCurrentPosition((info) => console.log(info));

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const SearchBar = ({ cityHandler }: any) => {
  const [skipPermissionRequests, setSkipPermissionRequests] = useState(false);
  const [authorizationLevel, setAuthorizationLevel] = useState<"auto">("auto");
  const [locationProvider, setLocationProvider] = useState<"auto">("auto");

  const [enableBackgroundLocationUpdates, setEnableBackgroundLocationUpdates] =
    useState(false);

  // useEffect(() => {
  //   if (Platform.OS === "android" || Platform.OS === "ios") {
  //     Geolocation.setRNConfiguration({
  //       skipPermissionRequests,
  //       authorizationLevel,
  //       locationProvider,
  //     });
  //   }
  // }, [skipPermissionRequests, authorizationLevel, locationProvider]);

  return (
    <View style={styles.backgroundStyle}>
      <GooglePlacesAutocomplete
        currentLocation={true}
        placeholder="Search"
        currentLocationLabel="Current location"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
        }}
        onPress={(data, details = null) => {
          console.log("DATA", data);
          // const city = data.description.split(",")[0];
          // cityHandler(city);
        }}
        styles={{
          textInput: {
            backgroundColor: "#eee",
            // borderRadius: 20,
            fontWeight: "700",
            marginLeft: 2,
            marginTop: 7,
          },
          textInputContainer: {
            // backgroundColor: "#eee",
            borderRadius: 80,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 8,
          },
        }}
        renderLeftButton={() => (
          <View style={{ marginLeft: 12, marginRight: 4 }}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View
            style={{
              flexDirection: "row",
              marginRight: 8,
              marginLeft: 10,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 30,
              alignItems: "center",
            }}
          >
            <AntDesign
              name="clockcircle"
              size={10}
              style={{ marginRight: 6 }}
            />
            <Text>Search</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flexDirection: "row",
  },
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});

export default SearchBar;
