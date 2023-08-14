import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { theme } from '../theme';


export default function Loading() {
    return (
        <View className="absolute flex-row justify-center items-center h-screen w-screen">
            <ActivityIndicator size="large" color={theme.background} style={{ transform: [{ scaleX: 3 }, { scaleY: 3 }] }} />
        </View>
    )
}