import { Box, Button, FormControl, HStack, Input, Modal, ScrollView, Select, Text, VStack, View } from "native-base";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,

} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar
} from "react-native-pell-rich-editor";
import Icon from "react-native-vector-icons/AntDesign";
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";
import useAppContext from "../store/userContext";
import Icon2 from "react-native-vector-icons/FontAwesome";

export default function AddNote() {
  const richText = useRef();

  const navigation = useNavigation();
  const route = useRoute()
  const { createJourney, addCategory, getCategories, categories, getJourneyById, journeyById, updateJourney, updateJourneyLoading, deleteJourney, deleteJourneyLoadingState, getJourney } = useAppContext();
  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [date, setDate] = useState(moment().format("DD MMMM YYYY"));


  const selectedJourney = route?.params?.selectedJourney;

  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [newCategory, setNewCategory] = useState("");
  const [selectedJourneyId, setSelectedJourneyId] = useState();

  const [currentJourney, setCurrentJourney] = useState();
 

  useEffect( () => {
    getCategories();
    if (route.params?.selectedJourney) {
      setCurrentJourney(selectedJourney)
      setTitle(selectedJourney.title);
      setDescHTML(selectedJourney?.descHTML);
      setCategory(selectedJourney?.category);
      setSelectedJourneyId(selectedJourney.journeyId);
      if(selectedJourney.descHTML)
      richText.current?.setContentHTML(selectedJourney.descHTML);
      setDate((selectedJourney?.createdAt));
    }

    return () => {
      setDescHTML("");
      setTitle("");
      setCategory("Personal");
      setDate(moment().format("DD MMMM YYYY"));
    }

  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarVisible: false,
    })
  }, [navigation])




  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  const submitContentHandle = () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      // send data to your server!
      const description = replaceWhiteSpace.slice(0, 100);
      createJourney(title, description, replaceWhiteSpace, descHTML, category, () => {
        console.log("journey created");
      });

    }
  };

  // const handleClear = () => {
  //   try {
  //     console.log(richText.current)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // };

  const handleDelete = () => {
    deleteJourney(selectedJourneyId,date,()=>{
      getJourney();
      navigation.navigate("Journal");
    } )
  }




  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <View px={5} mt={10} h='full' width='100%' >
        <HStack justifyContent="space-between" alignItems="center" w="full"  >
          <Icon name="arrowleft" size={30} color="#1A1D21" onPress={() => navigation.goBack()} />
            <HStack space={3} >
          <TouchableOpacity onPress={handleDelete} >
            <Icon name="delete" size={28} color="#1A1D21" />
          </TouchableOpacity>

          <TouchableOpacity onPress={submitContentHandle} >
            <Icon name="checkcircleo" size={28} color="#1A1D21" />
          </TouchableOpacity>
            </HStack>

        </HStack>
        <View py={3}>
        <Input
              value={title}
              onChangeText={setTitle}
              p={0}
              placeholder="Your Note Title "
              borderRadius={0}
              fontSize={30}
              variant="unstyled"
              fontFamily="mono"
              fontWeight="700"
              color="#1A1D21" />
          <HStack h="12" w="full"  justifyContent="space-between" space={4} alignItems="center" >
              
                <Select 
                selectedValue={category} 
                borderWidth={0} 
                dropdownIcon={
                  <Icon2 name="circle" size={7} color="#1A1D21" />
                }
              
                p="0" 
                borderColor="white" w="20" fontSize={14} fontWeight="500" color="#717676" onValueChange={(itemValue) => {
                  if (itemValue === "Add Category") {
                    setModalVisible(true);
                  }
                  else {
                    setCategory(itemValue)
                  }
                }} style={
                  {
                    borderWidth: 0,
                    borderColor: "transparent",
                  }
                }  >
                  {categories && categories.length && categories?.map((item, index) => (
                    <Select.Item label={item?.category} fontSize={14} fontWeight="500" color="#717676"
                      key={index}
                      value={item?.category} />
                  ))}
                  <Select.Item   label="Add Category" fontSize={14} fontWeight="500" color="#717676" value="Add Category" >
                <Icon name="pluscircle" size={30} color="#1A1D21" />
                  </Select.Item>
                </Select>
              <Text  fontSize={14} fontFamily="mono" fontWeight="500" flex={1}  color="#717676" >
                   {date}
            </Text>
            </HStack>
        
        </View>


        <View style={styles.richTextContainer} >
          <ScrollView>

            <RichEditor
              ref={richText}
              onChange={richTextHandle}
              placeholder="Write your cool content here :)"
              androidHardwareAccelerationDisabled={true}
              style={styles.richTextEditorStyle}
              initialHeight={400}
              editorStyle={{
                backgroundColor: "#1A1D21",
                color: "#fff",
                padding: 20,
                fontSize: 16,
                lineHeight: 24,
              }}
              onHeightChange={(height) => {
                scrollToInput(ReactNative.findNodeHandle(richText.current))

              }}

            />
          </ScrollView>
          <RichToolbar
            editor={richText}
            selectedIconTint="#873c1e"
            iconTint="#fff"
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.setStrikethrough,
              actions.setUnderline,
              actions.checkboxList,
            ]}


            style={styles.richTextToolbarStyle}


          />
        </View>
        {showDescError && (
          <Text style={styles.errorTextStyle}>
            Your content shouldn't be empty 🤔
          </Text>
        )}
      </View>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            Add Category </Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Category Name</FormControl.Label>
              <Input ref={initialRef} value={newCategory} onChangeText={setNewCategory} />
            </FormControl>

          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setModalVisible(false);
              }}>
                Cancel
              </Button>
              <Button onPress={() => {
                setModalVisible(false);
                addCategory(newCategory);
                setCategory(newCategory)
              }}>
                Add
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#ccaf9b",
    padding: 20,
    alignItems: "center"
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#312921",
    marginBottom: 10
  },

  htmlBoxStyle: {
    height: 200,
    width: 330,
    borderRadius: 10,
    padding: 20,
    marginBottom: 10
  },

  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    marginBottom: 10
  },

  richTextEditorStyle: {
    backgroundColor: "#1A1D21",
    borderColor: "#c6c3b3",
    borderRadius: 10,
    marginVertical: 10,
  },


  richTextToolbarStyle: {
    backgroundColor: "#1A1D21",
    borderColor: "#c6c3b3",
    borderRadius: 10,
    marginBottom: 20,
  },

  errorTextStyle: {
    color: "#FF0000",
    marginBottom: 10
  },

});
