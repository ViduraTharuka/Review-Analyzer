import { ScrollView, Text, StyleSheet } from "react-native"
import ReviewCard from "../componets/ReviewCard"
import { useRoute } from "@react-navigation/native";
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap , TabBar} from 'react-native-tab-view';




function ReadScreen () {

    const route = useRoute();
    const { reviewData } = route.params

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    // Create dynamic routes and scene mapping based on the reviewData
    const routes = reviewData.map((data, idx) => ({
        key: `tab${idx}`,
        title: data.platformName,
    }));

    const renderScene = ({ route }) => {
        const platformReviews = reviewData.find(data => `tab${reviewData.indexOf(data)}` === route.key).reviews;
    
        return (
          <ScrollView style={styles.container}>
            {platformReviews.map((review, index) => (
              <ReviewCard
                key={index}
                color="bg-emerald-300"
                title={review.title}
                review={review.review}
                reviewer={review.reviewer}
                country={review.country_name}
              />
            ))}
          </ScrollView>
        );
    };



    return (

        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={styles.indicator}
                    style={styles.tabBar}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    
})

export default ReadScreen