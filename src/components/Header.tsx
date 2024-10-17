import React from "react";
import UseMyLocation from "./UseMyLocation";
import { StyleSheet } from "react-native";
import { View } from "react-native";

interface UseMyLocationProps {
  onChange: (latitude: number, longitude: number) => void;
}

const Header = ({ onChange }: UseMyLocationProps) => {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {/* <div>
        <input
          type="search"
          placeholder="Search your area"
          className="search-input header_search"
        ></input>
      </div> */}

      <View style={styles.container}>
        <View style={styles.section}>
          <UseMyLocation onChange={(lat, lng) => onChange(lat, lng)} />
        </View>
      </View>
    </header>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1, // 0.5 means take 100% of the available space
  },
  container: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
