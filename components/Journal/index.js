import React from 'react'
import { Box, Center, Heading, Text, VStack } from 'native-base';

const Journal = () => {
  return (
    <Center  h='full' backgroundColor='primaryPurple.100' width='100%' >
      <Box p="2" py="8" w="90%" minH="full" maxW="500" >
        <Text fontSize='4xl' fontFamily='CormorantGaramond-Regular' color="white" py='3' f>
                Journal
        </Text>
        <VStack space={4} alignItems="center">
          <Box p="3" px='5'  w="full"  bg="indigo.400" rounded="2xl" shadow={3} opacity='0.8'  >
            <Text fontFamily='CormorantGaramond-SemiBold' color="white" fontSize="xl"  >
                Your Free Thoughts
            </Text>
            <Text fontFamily='CormorantGaramond-SemiBold' color="white" fontSize="xs" opacity="0.5"  >
                24 entires
            </Text>
          </Box>
          <Box p="3" px='5'  w="full"  bg="indigo.500" rounded="2xl" shadow={3} opacity='0.8'  >
            <Text fontFamily='CormorantGaramond-SemiBold' color="white" fontSize="xl"  >
                Your Free Thoughts
            </Text>
            <Text fontFamily='CormorantGaramond-SemiBold' color="white" fontSize="xs" opacity="0.5"  >
                24 entires
            </Text>
          </Box>
          <Box p="3" px='5'  w="full"  bg="indigo.600" rounded="2xl" shadow={3} opacity='0.8'  >
            <Text fontFamily='CormorantGaramond-SemiBold' color="white" fontSize="xl"  >
                Your Free Thoughts
            </Text>
            <Text fontFamily='CormorantGaramond-SemiBold' color="white" fontSize="xs" opacity="0.5"  >
                24 entires
            </Text>
          </Box>
          <Box p="3" px='5'  w="full"  bg="indigo.700" rounded="2xl" shadow={3} opacity='0.8'  >
            <Text fontFamily='CormorantGaramond-SemiBold' color="white" fontSize="xl"  >
                Your Free Thoughts
            </Text>
            <Text fontFamily='CormorantGaramond-SemiBold' color="white" fontSize="xs" opacity="0.5" >
                24 entires
            </Text>
          </Box>
          
        </VStack>
      </Box>
    </Center>
  )
}

export default Journal