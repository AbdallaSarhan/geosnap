import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Mapbox, {
	Camera,
	Images,
	LocationPuck,
	MapView,
	ShapeSource,
	SymbolLayer,
} from "@rnmapbox/maps";
import { featureCollection, point } from "@turf/helpers";

import pin from "../assets/images/pin.png";

import pointData from "../data/points.json";

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || "");

const Map = () => {
	const points = pointData.map((p) => point([p.long, p.lat]));
	const imageFeatures = featureCollection(points);
	return (
		<View style={styles.container}>
			<MapView style={{ flex: 1 }}>
				<Camera followUserLocation followZoomLevel={10} />
				<LocationPuck pulsing={{ isEnabled: true }} />

				<ShapeSource id="images" shape={imageFeatures}>
					<SymbolLayer
						id="image-icons"
						style={{
							iconImage: "pin",
							iconSize: 0.1,
							iconAllowOverlap: true,
						}}
					/>
					<Images images={{ pin }} />
				</ShapeSource>
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
