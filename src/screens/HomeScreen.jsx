import { StatusBar } from 'expo-status-bar';

import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Bars3CenterLeftIcon, FilmIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';

import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

import { theme } from '../theme';


export default function HomeScreen() {

    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        // console.log('got trending', data.results.length);
        if (data && data.results)
            setTrending(data.results);
        setLoading(false);
    }

    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        // console.log('got upcoming', data.results.length);
        if (data && data.results)
            setUpcoming(data.results);
    }

    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        // console.log('got top rated', data.results.length);
        if (data && data.results)
            setTopRated(data.results);
    }

    
    return (
        <View className="flex-1 bg-neutral-800">

            {/* Search Bar and Logo */}
            <SafeAreaView>

                <StatusBar style='light' />

                <View className="flex-row justify-between items-center mx-4 my-2 mb-3">
                    <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
                    <View className="flex-row">
                        <FilmIcon size='30' color='white' />
                        <Text className='text-white text-xl font-bold'>
                            <Text style={{ color: theme.text }}> M</Text>ovies
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size='30' color='white' />
                    </TouchableOpacity>
                </View>

                {
                    loading ? (
                        <Loading />
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            style={{ marginBottom: 50 }}
                        >
                            {/* Trending Movies Carousel */}
                            {trending.length > 0 && <TrendingMovies data={trending} />}

                            {/* upcoming movies row */}
                            {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}

                            {/* top rated movies row */}
                            {topRated.length > 0 && <MovieList title="Top Rated" data={topRated} />}

                        </ScrollView>
                    )
                }
            </SafeAreaView>
        </View>
    );
}