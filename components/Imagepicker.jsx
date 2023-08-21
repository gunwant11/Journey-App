import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from 'react-native';
const Imagepicker = ({setImage}) => {

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          });

            if (result.canceled) {
                alert("Upload cancelled");
                return;
            } else {
                const response = await fetch(result.assets[0].uri);
                const blob = await response.blob();
                console.log(blob,'response')
                const filename = result.uri.split('/').pop();
                const imageObj = {
                    uri: result.assets[0].uri,
                    filename: filename,
                    file : blob
                }
                setImage(imageObj)
            }

    }

  return (
    <TouchableOpacity onPress={pickImage}  >
        <Icon name="picture" size={30}  color="#1A1D21" />
    </TouchableOpacity>
  )
}

export default Imagepicker