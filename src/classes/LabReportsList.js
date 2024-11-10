import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
const data = [
    {
        id: '1',
        date: 'May 27, 2024 - 10:50 PM',
        labReportType: 'Blood Pressure Report',
    },
    {
        id: '2',
        date: 'May 20, 2024 - 12:30 PM',
        labReportType: 'Blood Sugar Report',
    },
    // Add more items as needed
];

const ListItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <View style={styles.detailsContainer}>
            <Image
                source={require('../assets/images/medilog/ic_doctor.png')}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.headerText}>{item.labReportType}</Text>
                <Text style={styles.secondaryText}>{item.date}</Text>
            </View>
        </View>
    </View>
);

const LabReportsList = () => {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const navigation = useNavigation();
    const handleFloatingButtonPress = () => {
        // Handle button press
        navigation.navigate('LabReportsForm')
    };

    const handleSearch = (text) => {
        setSearch(text);
        if (text) {
            const filtered = data.filter((item) =>
                item.labReportType.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Image
                    source={require('../assets/images/medilog/search.png')}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Health Record"
                    value={search}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem item={item} />}
            />

            {/* Floating Button */}
            <TouchableOpacity style={styles.floatingButton} onPress={handleFloatingButtonPress}>
                <Image
                    source={require('../assets/images/medilog/ic_white_plus.png')}
                    style={styles.floatingButtonImage}
                />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f2f4f8',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
        tintColor: '#888', // Optional: change icon color
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dateText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
        marginRight: 12,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2B1394',
    },
    secondaryText: {
        fontSize: 14,
        color: '#666',
    },
    summaryText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },

    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6a0dad',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    floatingButtonImage: {
        width: 20,
        height: 20,
        tintColor: '#fff', // Optional: change color of image if it’s an icon
    },
});

export default LabReportsList;
