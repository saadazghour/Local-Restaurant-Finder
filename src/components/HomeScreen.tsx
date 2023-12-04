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
      <Text style={styles.titleStyle}>Local Restaurant Finder 🍔</Text>

      <FlatList
        data={restaurants}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: any) => (
          <TouchableOpacity onPress={() => navigateToDetails(item)}>
            <View style={styles.restaurantContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
              <Text style={styles.reviewCount}>
                Reviews: {item.review_count}
              </Text>
              <Text style={styles.price}>Price: {item.price}</Text>
              <Text numberOfLines={1} style={styles.categories}>
                Categories: {""}
                {item.categories
                  .map((category: any) => category.title)
                  .join(", ")}
              </Text>

              {item.location ? (
                <Text style={styles.address} numberOfLines={1}>
                  Address: {item.location.display_address.join(", ")}
                </Text>
              ) : null}

              <Image
                style={styles.imageStyle}
                source={{ uri: item?.image_url }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  titleStyle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 5,
  },
  imageStyle: {
    height: 200,
    width: 300,
    marginVertical: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  name: {
    marginBottom: 4,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  container: {
    marginBottom: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...StyleSheet.absoluteFillObject,
  },
  rating: {
    fontSize: 16,
    color: "green",
  },
  reviewCount: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontSize: 16,
    color: "purple",
  },
  categories: {
    fontSize: 14,
    color: "blue",
    width: 200,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "black",
    width: 200,
  },
});

export default HomeScreen;
