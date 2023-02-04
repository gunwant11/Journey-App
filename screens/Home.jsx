import { API } from 'aws-amplify'
import { Avatar, Box, Button, Center, HStack, ScrollView, Skeleton, Text, VStack, View, useToast } from 'native-base'
import React, { Fragment, useEffect } from 'react'
import useAppContext from '../store/userContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import FolderCard from '../components/FolderCard';
import { useNavigation, useRoute } from '@react-navigation/native';

export const Home = () => {

  const {  getCategories,categories , user,getCategoriesLoading } = useAppContext();


  const route = useRoute();

  useEffect(() => {

    if (user) {
      getCategories()
    }

  }, [user,route])

  // useToasts globally available


  return (
    <Box w="100%" h="full" px={2} pt={5} background="#fff">
      <Box paddingX={4} >
        <HStack justifyContent="space-between" paddingY={5} alignItems="center">
          <Text fontSize={34} fontFamily="mono" fontWeight="700" color="#1A1D21">
            folders
          </Text>
          <Icon name="calendar-month" size={30} color="#1A1D21" />
        </HStack>
      </Box>
      <ScrollView  >
        <VStack space={2} paddingBottom="16" >
        <Text>
          {JSON.stringify(getCategoriesLoading)}
        </Text>
          {
            categories?.map((item, index) => {
              return (
                <Fragment key={index}>
                  <FolderCard category={item.category} lenght={item.count}  ></FolderCard>
                </Fragment>
              )
            })
          }
      
        </VStack>
      </ScrollView>
      
    </Box>
  )
}

