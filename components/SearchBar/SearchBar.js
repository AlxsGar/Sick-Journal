import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

function SearchBar({searchData}) {
  return (
    <View>
        <TextInput onChangeText={searchData} style={styles.searchBarDesign} placeholder='Buscar'/>
    </View>
  )
}

const styles = StyleSheet.create({
    searchBarDesign: {
        padding: 9,
        backgroundColor: '#F8F8F8',
        borderRadius: 6,
    }
})

export default SearchBar
