import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProfileCompletionIndicator from '../Components/ProfileCompletionIndicator';
import BackgroundWrapper from '../Components/BackgroundWrapper';
import { BuildStyleOverwrite } from '../assets/style/BuildStyle';
import { Styles } from '../assets/style/styles';


var styles = BuildStyleOverwrite(Styles);

const UserProfile = () => {
    const profileCompletion = 70; // Example percentage for profile completion
    const reportCompletion = 50; // Example percentage for reports
    const activityCompletion = 80; // Example percentage for last activity

    const renderProgressBar = (percentage) => (
        <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
        </View>
    );

    return (
        <View style={[styles['full_screen']]}>
            <BackgroundWrapper>
                <View style={[styles['full_screen'], { position: 'absolute' }]}>
                    {Platform.OS === 'android' && <StatusBar backgroundColor="#EFF6FF" barStyle='dark-content' />}
                    <View style={[styles['full_screen']]}>
                        {/* Greeting Section */}
                        <View style={styless.header}>
                            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>

                                <Image
                                    style={{ width: 50, height: 50, marginLeft: 10 }}
                                    source={require('../assets/images/medilog/ic_profile_.png')} />

                                <View style={{ justifyContent: 'center', marginLeft: 15, flex: 1 }}>
                                    <Text style={styless.username}>Kiran Kumar</Text>
                                    <Text style={styless.subtitle}>MediBonk Plus</Text>
                                </View>

                                <View
                                    style={styless.circlehead}>
                                    <Image
                                        style={{ width: 22, height: 22 }}
                                        source={require('../assets/images/medilog/ic_union.png')} />

                                </View>

                                <View
                                    style={styless.circlehead}>

                                    <Image
                                        style={{ width: 22, height: 22 }}
                                        source={require('../assets/images/medilog/ic_notification.png')} />

                                </View>

                            </View>

                            <Text style={styless.greeting}>Good Morning 😊</Text>

                        </View>

                        {/* Notifications Section */}
                        <View style={{ marginTop: 20, padding: 15 }}>
                            <Text style={styless.notificationsTitle}>Notifications</Text>
                            <View style={styless.notificationCard}>
                                <View style={{
                                    width: '92%', backgroundColor: 'white',
                                    opacity: 1, height: '100%', flexDirection: 'row', alignItems: 'center', paddingStart: 14,
                                }}>
                                    <Text style={{ color: 'black', flex: 0.9, fontSize: 16 }}>Avoid indiscriminate use of antibiotics</Text>
                                    <Image source={require('../assets/images/medilog/tablets_ic.png')} />
                                </View>

                                <Image
                                    style={{ width: 9, height: 12, tintColor: 'white', marginLeft: 10 }}
                                    source={require('../assets/images/medilog/right_arrow_blue_ic.png')} />
                            </View>
                        </View>


                        <View
                            style={[{
                                width: '92%', height: 170, backgroundColor: 'rgba(0,0,0,0.3)',
                                alignSelf: 'center', padding: 15
                            }]}>

                            <ProfileCompletionIndicator
                                progressText={'Please complete your profile'}
                                percentage={'85%'}
                                marginTop={0}
                                rightImage={require('../assets/images/medilog/right_arrow_blue_ic.png')}
                            />

                            <ProfileCompletionIndicator
                                progressText={'Add Your Old Reports'}
                                percentage={'100%'}
                                marginTop={10}
                                rightImage={require('../assets/images/medilog/right_arrow_blue_ic.png')}
                            />

                            <ProfileCompletionIndicator
                                progressText={'Your Last Activity'}
                                percentage={'100%'}
                                marginTop={10}
                                rightImage={require('../assets/images/medilog/ic_down_arrow.png')}
                            />
                        </View>
                    </View>
                </View>

            </BackgroundWrapper>

        </View>
    );
};

const styless = StyleSheet.create({


    header: {
        width: '100%',
        height: 145,
        backgroundColor: '#E8E8E8',
        padding: 15,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        alignSelf: 'center'
    },

    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    circlehead: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 10
    },
    subtitle: {
        color: '#6a6a6a',
    },
    greeting: {
        fontSize: 26,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10
    },
    notificationsTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 20,
        color: 'black',
    },
    notificationCard: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 8,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        height: 120,
        marginTop: 10,
        width: '100%'

    },
    cardContainer: {
        backgroundColor: '#f7f8fa',
        borderRadius: 8,
        padding: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6200ea',
    },
    cardPercentage: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    progressBarContainer: {
        width: '100%',
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginTop: 8,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#6200ea',
        borderRadius: 4,
    },
});

export default UserProfile;