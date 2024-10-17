import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

interface UseMyLocationProps {
  onChange: (latitude: number, longitude: number) => void;
}

const UseMyLocation: React.FC<UseMyLocationProps> = ({ onChange }) => {
  const showLocation = useCallback(
    (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      onChange(latitude, longitude);
    },
    [onChange]
  );

  const errorHandler = useCallback((err: GeolocationPositionError) => {
    if (err.code === 1) {
      alert("Error: Access is denied!");
    } else if (err.code === 2) {
      alert("Error: Position is unavailable!");
    }
  }, []);

  // https://react.dev/reference/react/useCallback
  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      // timeout at 60000 milliseconds (60 seconds)
      const options: PositionOptions = { timeout: 60000 };

      navigator.geolocation.getCurrentPosition(
        showLocation,
        errorHandler,
        options
      );
    } else {
      console.error("Sorry, browser does not support geolocation!");
    }
  }, [showLocation, errorHandler]);

  return (
    <View style={style.buttonText}>
      <input type="button" onClick={getLocation} value="USE MY LOCATION" />
    </View>
  );
};

const style = StyleSheet.create({
  buttonText: {
    color: "#fff",
    borderWidth: 0,
    width: "100%",
    borderRadius: 4,
    padding: 5,
  },
});

export default UseMyLocation;
