import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

import { image500 } from './../api/moviedb';
import { ArrowTrendingUpIcon } from 'react-native-heroicons/solid';

var { width, height } = Dimensions.get('window');


export default function TrendingMovies({ data }) {

    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    }


    return (
        <View className="mb-8">
            <View className="flex-row mx-4 mb-5 items-center">
                <ArrowTrendingUpIcon size='30' color='white' />
                <Text className="text-white text-xl">  Trending</Text>
            </View>

            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideScale={0.85}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    )
}


const MovieCard = ({ item, handleClick }) => {

    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                // source={require('../assets/images/moviePoster1.png')}
                source={{ uri: image500(item.poster_path) }}
                style={{
                    width: width * 0.6,
                    height: height * 0.4
                }}
                className="rounded-3xl"
            />
        </TouchableWithoutFeedback>
    )
}