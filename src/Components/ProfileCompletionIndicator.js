import React from 'react';
import { View, Text, Image } from 'react-native';

const ProfileCompletionIndicator = ({ progressText, percentage, marginTop }) => {
    return (
        <View style={{
            width: '100%', backgroundColor: 'white', height: 45, borderRadius: 8,
            flexDirection: 'row', alignItems: 'center', marginTop: marginTop
        }}>
            <View style={{
                width: '92%', height: '100%', backgroundColor: '#4C1D95', borderRadius: 8,
                justifyContent: 'center', flexDirection: 'row', alignItems:'center'
            }}>
                <View
                    style={{
                        width: `${percentage}`,
                    }}>
                    <Text style={{ color: 'white', fontSize: 14, paddingStart: 10, textAlign:'center' }}>{progressText}</Text>
                </View>

            </View>

            <View style={{ width: '8%', height:'100%', alignItems:'center', justifyContent:'center' }}>
                <Image
                    style={{
                        tintColor: '#2B1394', width: 15, height: 22,
                    }}
                    source={require('../assets/images/medilog/right_arrow_blue_ic.png')} />
            </View>

        </View>
    );
};



export default ProfileCompletionIndicator;
