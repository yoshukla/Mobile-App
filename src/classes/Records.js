import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import CustomPopup from "../Modals/CustomPopup";
import { Styles } from '../assets/style/styles';
import { BuildStyleOverwrite } from "../assets/style/BuildStyle";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

var styles = BuildStyleOverwrite(Styles);

const Records = () => {
    const navigation = useNavigation();
    const [isPopupVisible, setPopupVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
          // Set the boolean to true every time the tab is focused
          setPopupVisible(true);
        //   return () => setIsLoaded(false); // Optional: Cleanup when leaving the screen
        }, [])
      );

    return (
        <View>
            <Text>Records</Text>
            <CustomPopup
                visible={isPopupVisible}
                onClose={""}
                onSubmit={""}
                showCenter={false}
            >
                {/* Pass dynamic content as children */}
                <TouchableOpacity
                    style={[styles['flex_direction_row'], { width: '100%', alignItems: 'center', }]} onPress={() => {
                        setPopupVisible(false)
                        navigation.navigate('HospitalReports')
                    }}>
                    <Image
                        source={require('../assets/images/medilog/ic_hospital_reports.png')}
                        style={{ width: 20, height: 20, marginRight: 10 }}
                    />
                    <Text style={{ color: 'black' }}>Hospital Reports</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles['flex_direction_row'], { width: '100%', marginTop: 25, alignItems: 'center' }]}
                    onPress={() => {
                        setPopupVisible(false)
                        navigation.navigate('LabReportsList')
                    }}
                >
                    <Image
                        source={require('../assets/images/medilog/ic_lab_reports.png')}
                        style={{ width: 20, height: 20, marginRight: 10 }}
                    />
                    <Text style={{ color: 'black' }}>Lab Reports</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles['flex_direction_row'], { width: '100%', marginTop: 30, alignItems: 'center' }]}
                    onPress={() => {
                        setPopupVisible(false)
                        navigation.navigate('AppointmentsList')
                    }}>

                    <Image
                        source={require('../assets/images/medilog/ic_appointments.png')}
                        style={{ width: 20, height: 20, marginRight: 10 }}
                    />
                    <Text style={{ color: 'black' }}>Appointments</Text>
                </TouchableOpacity>
            </CustomPopup>
        </View>
    )
}

export default Records;