import React, { Component } from "react";
import { Image, Text, View, ScrollView } from "react-native";

export default class PlanetScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { data: {} };
  }

  async componentDidMount() {
    let data = await this.props.navigation.getParam("planet");

    console.log(data);
    this.setState({ data: data });
  }

  render() {
    let data = this.state.data;
    let planetType = data.planet_type;
    if (planetType) {
      planetType = planetType.toLowerCase();
      if (planetType !== "neptune-like") {
        planetType = planetType.split(" ");
      } else {
        planetType = planetType.split("-");
      }

      if (planetType.length == 1) {
        planetType = planetType[0];
      } else {
        planetType = planetType.join("_");
      }
    }
    return (
      <ScrollView>
        <View
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginTop: 50,
              width: "100%",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {data.name}
          </Text>
          <Image
            style={{ width: 300, height: 300, marginTop: 10 }}
            source={{
              uri: `https://raw.githubusercontent.com/whitehatjr/Planet-Image-assets/main/assets/planet_type/${planetType}.png`,
            }}
          />
          <Text style={{ marginTop: 10, marginBottom: 20 }}>
            Specifications:{" "}
          </Text>
          {Object.keys(data).map((key) => {
            return (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "flex-start",
                  marginLeft: 20,
                  marginTop: 5,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>{key}: </Text>
                <Text>{data[key]}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
