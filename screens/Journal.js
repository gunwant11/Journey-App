import React, { useReducer } from "react";
import {
  Box,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import useAppContext from "../store/userContext";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import NoteCard from "../components/NoteCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import GradientView from "../components/GradientView";

export const Journal = () => {
  const { getJourney, journeys } =
    useAppContext();

  const router = useRoute();

  useEffect(() => {
      // getJourney();
  }, [router]);

  useEffect(() => {
    console.log(journeys, 'journeys');
  }, [journeys]);


  return (
    <GradientView>
      <View pt={8} h="full" width="100%">
        <Box px={5} w="full"  >
            <Text
              fontSize={30}
              fontFamily="mono"
              fontWeight="700"
              color="#1A1D21"
            >
              My Journeys
            </Text>
        </Box>
        <Box>
          <ScrollView>
            <VStack space={3} px={3} pt="5" w="full" pb={200}>
              { journeys?.map((journey, index) => (
                <NoteCard
                  journey={journey}
                  accentCard={false}
                  title={journey?.title}
                  description={journey?.description}
                  key={index}
                  date={journey?.createdAt}
                  journeyId={journey?.journeyId}
                />
              ))}
            </VStack>
          </ScrollView>
        </Box>
      </View>
    </GradientView>
  );
};
