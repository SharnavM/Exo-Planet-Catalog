import React, { Component } from "react";
import { TouchableOpacity, Text, FlatList, View } from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { data: null };
  }

  getPlanetData = async () => {
    let res = await fetch("http://42d0e5874184.ngrok.io");
    res = await res.json();

    this.setState({ data: res.data });
  };

  componentDidMount() {
    this.getPlanetData();
  }

  render() {
    return (
      <View>
        {this.state.data == null ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            <View
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ marginTop: 50, fontSize: 24, fontWeight: "bold" }}>
                Exo Planet Catalog
              </Text>
            </View>
            <FlatList
              keyExtractor={(item) => item.name}
              maxToRenderPerBatch={15}
              style={{ marginTop: 20 }}
              data={this.state.data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Planet", {
                        planet: item,
                      });
                    }}
                    style={{
                      padding: 10,
                      borderBottomColor: "#888",
                      borderTopColor: "#888",
                      borderBottomWidth: 1,
                      borderTopWidth: 1,
                      backgroundColor: index % 2 == 0 ? "#F4A261" : "#6CC2BD",
                    }}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>
    );
  }
}
