import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { fallbackMoviePoster, image185 } from '../api/moviedb';
import { theme } from '../theme';
import { ForwardIcon, TrophyIcon, VideoCameraIcon } from 'react-native-heroicons/solid';


const { width, height } = Dimensions.get('window');


export default function MovieList({ title, hideSeeAll, data }) {

    const navigation = useNavigation();

    return (
        <View className="mb-8 space-y-4">

            <View className="mx-4 flex-row justify-between items-center">
                <View className="flex-row items-center">
                    {
                        title === 'Upcoming' ? (
                            <ForwardIcon size='25' color='white' />
                        ) : title === 'Top Rated' ? (
                            <TrophyIcon size='25' color='white' />
                        ) : (
                            // Default icon or content when title doesn't match any condition
                            <VideoCameraIcon size='25' color='white' />
                        )
                    }
                    <Text className="text-white text-lg">  {title}</Text>
                </View>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={{ color: theme.text }} className="text-lg">See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}
                            >
                                <View className="space-y-1 mr-4">
                                    <Image
                                        // source={require('../assets/images/moviePoster2.png')}
                                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                        className="rounded-3xl"
                                        style={{ width: width * 0.33, height: height * 0.22 }}
                                    />
                                    <Text className="text-neutral-300 ml-1">
                                        {
                                            item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}