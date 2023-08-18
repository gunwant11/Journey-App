import { View, Text } from 'react-native'
import React from 'react'
import {Calendar} from 'react-native-calendars';
import GradientView from '../components/ui/GradientView';
import { useState } from 'react';
const Calander = () => {
  const [dates, setDates] = useState([
    '2023-07-14',
    '2023-07-08',
    '2023-07-10',
  ]);

  const emojis = {
    '2023-07-14': '❤️',
    '2023-07-08': '🎂',
  };

  const handleDateSelected = (date) => {
    setDates(dates.map((d) => {
      return d === date ? emojis[d] : d;
    }));
  };
  return (
    <GradientView>
      <Text>Calander</Text>
      <Calendar
    style={{
      backgroundColor : 'transparent',
    }}
    markingType={'custom'}
    date={dates}
    markedDates={{
      '2023-08-28': {
        customStyles: {
          container: {
            backgroundColor: 'green'
          },
          text: {
            color: 'black',
            fontWeight: 'bold'
          }
        }
      },
      '2023-08-29': {
        type: 'custom',
        marked : true,
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

  }
  }
/>
    </GradientView>
  )
}

export default Calander