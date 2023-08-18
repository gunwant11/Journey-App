import React from "react";
import { VStack, View, Text, HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NoteCard = ({ accentCard, title, description, journeyId, journey, date }) => {
  const navigation = useNavigation();

  const journeyDate = {
    date: new Date(parseInt(date)).getDate().toString().length == 1 ? `0${new Date(parseInt(date)).getDate()}` : new Date(parseInt(date)).getDate(),
    month: new Date(parseInt(date)).toDateString().slice(4, 7),
    year: new Date(parseInt(date)).getFullYear(),
    day : new Date(parseInt(date)).toDateString().slice(0, 3)
  }



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
        px="4"
        space={3}
        bg={"#fff"}
        rounded="xl"
        height="48"
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
            🥰
            </Text>
        </HStack>

        <HStack>
          <VStack>
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
