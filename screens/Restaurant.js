import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

import {COLORS, FONTS, SIZES, icons, images} from '../constants';
// each food's detail screen
export default function Restaurant({route: {params}, navigation}) {
  const ScrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    const {item, currentLocation} = params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  });

  // handle + and - in the detail page
  const editOrder = (action, menuId, price) => {
    const orderList = orderItems.slice();
    const item = orderList.filter(item => item.menuId === menuId);
    if (action === '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          qty: 1,
          menuId: menuId,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }
      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0].qty < 0) {
          item[0].qty = 0;
          item[0].total = 0;
        }
        if (item[0]?.qty > 0) {
          let newQty = item[0]?.qty - 1;
          item[0].qty = newQty;
          item[0].total = item[0].qty * price;
        }
      }
      setOrderItems(orderList);
    }
  };
  //  get orderqty
  const getOrderQty = menuId => {
    let order = orderItems.filter(item => item.menuId === menuId);
    if (order.length > 0) {
      return order[0].qty;
    }
    return 0;
  };
  const getItemCount = () => {
    let itemCount = orderItems.reduce(
      (count, item) => count + (item.qty || 0),
      0,
    );
    return itemCount;
  };
  const getTotalPrice = () => {
    let total = orderItems.reduce(
      (count, item) => count + (item.total || 0),
      0,
    );
    return total.toFixed(2);
  };
  // header part include back and search and list item in here component
  const RenderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: 10,
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            style={{width: 30, height: 30}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              paddingVertical: 10,
              paddingHorizontal: 20,

              backgroundColor: '#efeff1',
            }}>
            <Text style={{...FONTS.h5, fontWeight: 'bold'}}>
              {restaurant?.name}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{width: 50}}>
          <Image source={icons.list} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
    );
  };
  // render main part food image and some description
  const RenderFoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: ScrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}>
        {restaurant?.menu.map((item, index) => (
          <View key={index} style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                width: SIZES.width * 0.95,
                height: SIZES.height * 0.35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{
                  width: SIZES.width,
                  height: '100%',
                }}
              />
              {/* the part render left button  and right  button  in here ,just like click to increment or decrement  */}
              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  width: SIZES.width,
                  height: 50,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                {/* left side */}
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}>
                  <Text
                    style={{...FONTS.body1}}
                    onPress={() => editOrder('-', item.menuId, item.price)}>
                    -
                  </Text>
                </TouchableOpacity>
                {/* mid side */}
                <View
                  style={{
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }}>
                  <Text style={{...FONTS.h2}}>{getOrderQty(item.menuId)}</Text>
                </View>
                {/* right side */}
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomRightRadius: 25,
                    borderTopRightRadius: 25,
                  }}>
                  <Text
                    style={{...FONTS.body1}}
                    onPress={() => editOrder('+', item.menuId, item.price)}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 15,
              }}>
              <Text
                style={{...FONTS.h4, fontWeight: 'bold', marginVertical: 10}}>
                {item.name} -- {item.price.toFixed(2)}
              </Text>
              <Text>{item.description}</Text>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image
                  source={icons.fire}
                  style={{width: 20, height: 20, marginRight: 10}}
                />
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.darkgray,
                    textAlign: 'center',
                  }}>
                  {item.calories.toFixed(2)} Cal
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };
  // render bottom order side

  const RenderFoodOrder = () => {
    const RenderPoint = () => {
      const dotPoints = Animated.divide(ScrollX, SIZES.width);
      return (
        <View style={{height: 30}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 15,
              marginTop: 15,
            }}>
            {restaurant?.menu.map((item, index) => {
              const opacity = dotPoints.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp',
              });
              const dotSize = dotPoints.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                extrapolate: 'clamp',
              });
              const dotColors = dotPoints.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={`dot-${index}`}
                  opacity={opacity}
                  style={{
                    borderRadius: SIZES.radius,
                    marginHorizontal: 6,
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: dotColors,
                  }}></Animated.View>
              );
            })}
          </View>
        </View>
      );
    };
    return (
      <View>
        <RenderPoint />
        {/* order card */}
        <View
          style={{
            marginTop: 15,
            backgroundColor: 'white',
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
          }}>
          {/* top line */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 20,
              paddingHorizontal: 35,
              borderBottomColor: COLORS.lightGray,
              borderBottomWidth: 1,
            }}>
            <Text style={{...FONTS.h3, fontWeight: 'bold'}}>
              {getItemCount()} Items in Cart
            </Text>
            <Text style={{...FONTS.h3, fontWeight: 'bold'}}>
              $ {getTotalPrice()}
            </Text>
          </View>
          {/* locatio line */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 20,
              paddingHorizontal: 35,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.pin}
                style={{width: 20, height: 20, tintColor: COLORS.darkgray}}
              />
              <Text
                style={{marginHorizontal: 10, ...FONTS.h4, fontWeight: 'bold'}}>
                Location
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image
                source={icons.master_card}
                resizeMode="contain"
                style={{width: 20, height: 20, tintColor: COLORS.darkgray}}
              />
              <Text style={{marginLeft: 15, ...FONTS.h4}}>88 </Text>
            </View>
          </View>
          {/* order button */}
          <View
            style={{
              padding: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: 15,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                borderRadius: 40,
              }}
              onPress={() =>
                navigation.navigate('delivery', {
                  restaurant: restaurant,
                  currentLocation: currentLocation,
                })
              }>
              <Text style={{color: 'white', ...FONTS.h4, fontWeight: 'bold'}}>
                Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isIphoneX() && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -34,
              height: 34,
              backgroundColor: 'white',
            }}></View>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader />
      <RenderFoodInfo />
      <RenderFoodOrder />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
