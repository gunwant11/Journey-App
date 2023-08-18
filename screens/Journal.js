import React, { useReducer } from "react";
import {
  Box,
  Center,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import useAppContext from "../store/userContext";
import { useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { SafeAreaView, TouchableOpacity } from "react-native";
import NoteCard from "../components/NoteCard";
import userReducer from "../store/userReducer";
import { useNavigation, useRoute } from "@react-navigation/native";
import Tabs from "../components/Tabs";
import GradientView from "../components/ui/GradientView";

export const Journal = () => {
  const { getJourney, journeys, deleteJourney, getJourneyByCategory } =
    useAppContext();

  const router = useRoute();
  const navigation = useNavigation();
  const category = router?.params?.category;
  const [currentCategory, setCurrentCategory] = React.useState(
    category || "all"
  );

  useEffect(() => {
    setCurrentCategory(category);
    if (category) {
      getJourneyByCategory(category);
    } else {
      getJourney();
    }
  }, [router]);

  useEffect(() => {
    console.log("journeys", journeys, journeys?.length )
  }, [journeys]);

  return (
    <GradientView>
      <View pt={10} h="full" width="100%">
        <Box px={5} w="full">
          <Text
            fontSize={30}
            fontFamily="mono"
            fontWeight="700"
            color="#1A1D21"
          >
            {/* {currentCategory || 'all'} journeys */}
            My Journal
          </Text>
          {/* button to delete */}
          {/* <Icon name="delete" size={30} color="#1A1D21" onPress={()=> deleteJourney("d06c18ab-4bf5-46e9-a603-ee30fe2326a5", "1664548912797") } /> */}
          {/* button to get all notes */}
          {/* <Icon name="search1" size={30} color="#1A1D21" onPress={()=> getJourney() } /> */}
        </Box>
        {/* <Box px={5} w="full" >
          <ScrollView   >
            <Tabs setCurrentCategory={setCurrentCategory}  />
            </ScrollView>
            </Box> */}
        <Box>
          <ScrollView>
            <VStack space={3} px={3} pt="5" w="full" pb={200}>
              {journeys?.map((journey, index) => (
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
