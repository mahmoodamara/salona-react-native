import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SIZES, COLORS,cityName } from "./constants/theme";
import AppIntroSlider from "react-native-app-intro-slider";
import * as Location from 'expo-location';

const slides = [
  {
    id: "1",
    title: "اهلا بك في تطبيق صالونا",
    description:
      "صالونا هو تطبيق مخصص لخدمات الحلاقة والتجميل. صمم التطبيق لتسهل حجز المواعيد والوصول إلى خدمات الحلاقة والعناية بالجمال بشكل مريح ومباشر.",
    image: require("./assets/adaptive-icon1.jpg"),
  },
  {
    id: "2",
    title: "تعين الادوار",
    description:
      "نعمل جاهدين على تسهيل استخدام التطبيق عبر تعيين الأدوار بعناية وسهولة.",
    image: require("./assets/adaptive-icon2.jpg"),
  },
  {
    id: "3",
    title: "سهولة الاستخدام",
    description:
      "تجربة سهلة وسلسة هي ركيزة أساسية في تطبيقنا. باستخدام واجهة مستخدم بسيطة وتصميم مرن، يمكنك الانغماس في التطبيق بسهولة ويسر.",
    image: require("./assets/adaptive-icon3.jpg"),
  },
];

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [cityName, setCityName] = useState('');
 

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCurrentRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    fetchCityName(location.coords.latitude, location.coords.longitude);
  };

  const fetchCityName = async (latitude, longitude) => {
    try {
      let address = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address && address.length > 0) {
        setCityName(address[0].city);
      }
    } catch (error) {
      console.log('Error fetching city name:', error);
    }
  };

  const buttomLabel = (label) => {
    return (
      <View style={{ padding: 12 }}>
        <Text style={{ color: COLORS.title, fontWeight: '600', fontSize: SIZES.h3 }}>{label}</Text>
      </View>
    );
  };

  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                padding: 5,
                paddingTop: 130,
              }}
            >
              <Image
                source={item.image}
                style={{ width: SIZES.width=280, height: 280 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.title,
                  fontSize: SIZES.h1,
                  paddingTop: 10,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  paddingTop: 5,
                  fontSize: SIZES.h2,
                  width: 350
                }}
              >
                {item.description}
              </Text>
            </View>
          );
        }}
        activeDotStyle={{ backgroundColor: COLORS.primary, width: 25 }}
        showSkipButton
        renderNextButton={() => buttomLabel('التالي')}
        renderSkipButton={() => buttomLabel('تخطي')}
        renderDoneButton={() => buttomLabel('انهاء')}
        onDone={() => { 
          setShowHomePage(true) 
                getLocation();

        }}
      />
    );
  } else {
  
    return (
      <View style={styles.container}>
        <Text style={styles.logo}> {cityName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
