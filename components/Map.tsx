import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Mapbox, { Camera, LocationPuck, MapView } from "@rnmapbox/maps";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

const Map = () => {
	return (
		<View style={styles.container}>
			<MapView style={{ flex: 1 }}>
				<Camera followUserLocation followZoomLevel={13} />
				<LocationPuck pulsing={{ isEnabled: true }} />
			</MapView>
		</View>
	);
};

export default Map;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: "100%",
	},
});
