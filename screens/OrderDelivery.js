import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {COLORS, FONTS, icons, images} from '../constants';

export default function OrderDelivery({route: {params}, navigation}) {
  const [currentLocation, setCurrentLocation] = useState(
    params.currentLocation,
  );
  const [restaurant, setRestaurant] = useState(params.restaurant);

  const RenderMap = () => {
    return (
      <View style={{flex: 1}}>
        <MapView style={{flex: 1}}></MapView>
        {/* top section , in search and loaction show */}
        <View
          style={{
            width: '90%',
            height: 40,
            position: 'absolute',
            backgroundColor: 'white',
            top: 20,

            borderRadius: 45,
            left: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.location}
                resizeMode="contain"
                style={{width: 20, height: 20, marginHorizontal: 10}}
              />
              <Text style={{...FONTS.h4}}>
                745 {currentLocation?.streetName}
              </Text>
            </View>
            <View>
              <Text style={{fontWeight: '600'}}>7 mins</Text>
            </View>
          </View>
        </View>
        {/* bottom card , ride info ,and ride postion info  */}

        <View
          style={{
            width: '90%',
            height: 150,
            position: 'absolute',
            backgroundColor: 'white',
            flexDirection: 'column',
            bottom: 50,
            borderRadius: 25,
            left: 20,
            paddingVertical: 25,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: '45%',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={images.avatar_1}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: COLORS.primary,
                  borderRadius: 10,
                  marginHorizontal: 10,
                }}
              />
              <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                <Text style={{...FONTS.h3, fontWeight: 'bold'}}>
                  Ilia Utkin
                </Text>
                <Text style={{...FONTS.body5, color: COLORS.darkgray}}>
                  {restaurant.name}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={icons.star}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                  marginHorizontal: 5,
                  tintColor: COLORS.primary,
                }}
              />
              <Text>{restaurant.rating}</Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{
                width: '48%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f2f2f4',
                borderRadius: 15,
              }}>
              <View>
                <Text style={{...FONTS.h3, color: 'black', fontWeight: 'bold'}}>
                  Message
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '48%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                backgroundColor: COLORS.primary,
                borderRadius: 15,
              }}>
              <View>
                <Text style={{...FONTS.h3, color: 'white', fontWeight: 'bold'}}>
                  Call
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* side part increment and decrement button styled */}
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            width: 50,
            height: 50,
            right: 20,
            top: 150,
            borderRadius: 45,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Text style={{...FONTS.h2}}>+</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            width: 50,
            height: 50,
            right: 20,
            top: 225,
            borderRadius: 45,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Text style={{...FONTS.h2}}>一</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <RenderMap />
    </View>
  );
}
