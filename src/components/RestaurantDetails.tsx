import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const RestaurantDetails = ({ route }: any) => {
  const { result }: any = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={
          result.image_url
            ? { uri: result.image_url }
            : require("../../assets/no-image.png")
        }
      />
      <Text style={styles.nameStyle}>{result.name}</Text>
      <Text style={styles.details}>{result.phone}</Text>
      <Text style={styles.details}>
        {result.rating} Stars, {result.review_count} Reviews
      </Text>
      <Text style={styles.details}>
        Price: {result.price}, Categories:{" "}
        {result.categories.map((category: any) => category.title).join(", ")}
      </Text>
      <Text style={styles.details}>
        Address: {result.location.display_address.join(", ")}
      </Text>
      <Text style={styles.details}>
        Transactions:{" "}
        {result.transactions
          ? result.transactions.join(", ")
          : "No transactions found"}
      </Text>
      <Text style={styles.details}>
        <Text style={{ fontWeight: "bold" }}>More Info:</Text>{" "}
        <Text
          style={{ color: "#007BFF", textDecorationLine: "underline" }}
          onPress={() => {
            window.open(result.url, "_blank");
          }}
        >
          {result.url}
        </Text>
      </Text>

      <View style={styles.cheerfulMessageContainer}>
        <Text style={styles.cheerfulMessage}>Enjoy exploring! 🌟</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 10,
    padding: 15,
  },
  imageStyle: {
    marginVertical: 10,
    borderRadius: 6,
    height: 200,
    width: "100%", // Take full width
    marginBottom: 10,
  },
  nameStyle: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 10,
    textAlign: "center",
  },
  cheerfulMessageContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  cheerfulMessage: {
    fontSize: 18,
    marginTop: 40,
    color: "#28a745",
  },
  details: {
    marginBottom: 5,
    alignItems: "center",
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
});

export default RestaurantDetails;
