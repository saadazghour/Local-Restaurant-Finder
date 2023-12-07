import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { fetchNearbyRestaurants } from "../services/api";

import Header from "./Header";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const RestaurantImage = ({ image }: any) => {
  return (
    <View>
      <Image
        source={{
          uri: image,
        }}
        style={{ width: "100%", height: 180, borderRadius: 6 }}
      />
      <TouchableOpacity style={{ position: "absolute", right: 10, top: 10 }}>
        <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const RestaurantInfo = ({ name, rating, review_count }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{name}</Text>
        <Text style={{ fontSize: 13, color: "gray" }}>
          Reviews: {review_count}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#eee",
          height: 30,
          width: 30,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
        }}
      >
        <Text>{rating}</Text>
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }: any) => {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    // Fetch nearby restaurants when the component mounts
    fetchNearbyRestaurants()
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!restaurants?.length) {
    return null;
  }

  const navigateToDetails = (item: any) => {
    navigation.navigate("Restaurants Details", { result: item });
  };

  return (
    <View style={styles.container}>
      <Header onChange={() => {}} />
      <Text style={styles.titleStyle}>Local Restaurant Finder 🍔</Text>

      <FlatList
        data={restaurants}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            key={item.id.toString()}
            activeOpacity={1}
            style={{ marginBottom: 30 }}
            onPress={() => navigateToDetails(item)}
          >
            <View
              style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
            >
              <RestaurantImage image={item?.image_url} />

              <RestaurantInfo
                review_count={item.review_count}
                name={item.name}
                rating={item.rating}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 5,
  },

  container: {
    marginBottom: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
