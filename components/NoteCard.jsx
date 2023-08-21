import React from "react";
import { VStack, View, Text, HStack } from "native-base";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const getDate = (val) => {
  const currDate = new Date(parseInt(val))
  return {
    date : currDate.getDate().toString().length == 1 ? `0${currDate.getDate()}`: currDate.getDate(),
    day: currDate.toDateString().slice(0,3),
    month: currDate.toDateString().slice(4, 7),
    year:  currDate.getFullYear()

  }
}
const NoteCard = ({ accentCard, title, description, journeyId, journey, date }) => {
  const navigation = useNavigation();

  const journeyDate =  getDate(date)




  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AddNote", {
          selectedJourney: journey,
        })
      }
    >
      <VStack
        p="4"
        space={2}
        bg={"#fff"}
        rounded="xl"
        height="56"
      >
        <HStack justifyContent="space-between" alignItems="center" >
          <HStack alignItems="flex-end" space={2} >
            <VStack  >
              <Text fontWeight="700"  fontSize="3xl"  p={0}  m={0}>
                {journeyDate?.date}
              </Text>
              <View borderBottomWidth={6} borderBottomColor="#5a51906b" width="100%" position="absolute"  bottom={1.5} />
            </VStack>
            <Text color="#717676"  pb={1}>
               {journeyDate?.day}, {journeyDate?.month} {journeyDate?.year}
            </Text>
          </HStack>
            <Text color="#717676" fontSize="2xl"  py={1} px={2} borderRadius={55} bg="#b2aed1">
            {journey?.mood?.emoji}
            </Text>
        </HStack>

        <HStack space={3} h={'100%'} >
        {journey?.imageUrl &&
        <View width='45%' mb={8} height="100%" >
           <Image
              source={{ uri: journey?.imageUrl }}
              style={{ width: "100%",  height:"75%" ,borderRadius: 10 }}
            />
        </View>}
          <VStack  >
            <Text color="black" fontSize="lg" fontWeight={900}>
              {title}
            </Text>
            <Text color={accentCard ? "white" : "#717676"}>{description} ....</Text>
          </VStack>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
};

export default NoteCard;
