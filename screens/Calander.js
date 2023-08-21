import React, {useState, useEffect} from 'react'
import { Calendar } from 'react-native-calendars';
import GradientView from '../components/GradientView';
import { Box, ScrollView, Text } from 'native-base';
import useAppContext from '../store/userContext';
import NoteCard from '../components/NoteCard';
const Calander = () => {

  const { getJourneyByDate , journeysByDate } = useAppContext();
  const [selectedDate, setSelectedDate] = useState()


  useEffect(() => {
    // get journey by date
    // getJourneyByDate('1692599030773')
  }
  , [])

  return (
    <GradientView>
      <Box px={5} pt={8} w="full">
          <Text
            fontSize={30}
            fontFamily="mono"
            fontWeight="700"
            color="#1A1D21"
          >
            Calander
          </Text>
        </Box>
      <Calendar
        style={{
          backgroundColor: 'transparent',
        }}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          arrowColor: 'black',
          dayTextColor: 'black',
          textDisabledColor: '#000',
        }}
        maxDate={new Date().toISOString().split('T')[0]}
        markingType={'custom'}
        markedDates={{
          '2023-08-21': {
            type: 'custom',
            marked: true,
            customStyles: {
              container: {
                backgroundColor: 'white',
                elevation: 2,

              },
              text: {
                color: 'blue',
              }
            }
          }
        }}

        onDayPress={(day) => {
          console.log(day)
          setSelectedDate(day.dateString)
          // get journey by date
        }
        }
      />
      <ScrollView px={3} pt="5" w="full" pb={200}>
        {
          journeysByDate?.map((journey, index) => (
            <NoteCard
              journey={journey}
              accentCard={false}
              title={journey?.title}
              description={journey?.description}
              key={index}
              date={journey?.createdAt}
              journeyId={journey?.journeyId}
            />
          ))
        }
      </ScrollView>

    </GradientView>
  )
}

export default Calander