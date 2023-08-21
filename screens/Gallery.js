import React from 'react'
import GradientView from '../components/GradientView'
import { Box, Flex, HStack, Image, ScrollView, Spacer, Text, View } from 'native-base'
import useAppContext from '../store/userContext';



const Gallery = () => {

  const { journeys } = useAppContext();


  return (
    <GradientView>
      <View pt={8} h="full" width="100%">
        <Box px={5} w="full">
          <Text
            fontSize={30}
            fontFamily="mono"
            fontWeight="700"
            color="#1A1D21"
          >
            Gallery
          </Text>
        </Box>
        
          <ScrollView mx={2} mt={2} >
            {journeys?.filter(e => e.imageUrl).slice(0, 1).map((item, i) => {
              return (
                <View key={i} >
                  <Image
                    source={{ uri: item?.imageUrl }}
                    style={{ height: 200, borderRadius: 10 }}
                    alt="image"
                  />
                </View>
              );}
            )}
            <Flex style={{gap : 8}}  direction="row" wrap="wrap" justifyContent="space-between" mt={2} space={2} >
            {journeys?.filter(e => e.imageUrl).slice(1).map((item, i) => {
                return (
                  <View key={i} width={'48.5%'} >
                    <Image
                      source={{ uri: item?.imageUrl }}
                      style={{ height: 200, borderRadius: 10 }}
                      width={'100%'}
                      alt="image"
                    />
                  </View>
                  );}
            )}
            </Flex>
          </ScrollView>
      </View>
    </GradientView>

  )
}

export default Gallery