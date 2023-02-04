import { createContext, useContext } from "react";
import userReducer, { initialState } from "./userReducer";
import React from "react";
import 'react-native-get-random-values';
import { useReducer } from "react";
import { API } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { Toast } from 'native-base';
export const userActionTypes = {
  SET_CONFIRMATION_EMAIL: "SET_CONFIRMATION_EMAIL",
  SET_USER: "SET_USER",
  CREATE_JOURNEY: "CREATE_JOURNEY",
  CREATE_JOURNEY_LOADING: "CREATE_JOURNEY_LOADING",
  GET_JOURNEY_BY_USER: "GET_JOURNEY_BY_USER",
  GET_JOURNEY_BY_USER_LOADING: "GET_JOURNEY_BY_USER_LOADING",
  DELETE_JOURNEY: "DELETE_JOURNEY",
  DELETE_JOURNEY_LOADING: "DELETE_JOURNEY_LOADING",
  UPDATE_JOURNEY: "UPDATE_JOURNEY",
  UPDATE_JOURNEY_LOADING: "UPDATE_JOURNEY_LOADING",
  GET_JOURNEY_BY_CATEGORY: "GET_JOURNEY_BY_CATEGORY",
  GET_JOURNEY_BY_CATEGORY_LOADING: "GET_JOURNEY_BY_CATEGORY_LOADING",
  GET_CATEGORIES: "GET_CATEGORIES",
  GET_CATEGORIES_LOADING: "GET_CATEGORIES_LOADING",
  GET_JOURNEY_BY_ID: "GET_JOURNEY_BY_ID",
  GET_JOURNEY_BY_ID_LOADING: "GET_JOURNEY_BY_ID_LOADING",
  ADD_CATEGORY: "ADD_CATEGORY",

}

const UserContext = createContext(initialState);

const handleNotification = (message, type) => {
  let backgroundColor = "#000";
  if(type === "success") backgroundColor = "#00b894";
  if(type === "error") backgroundColor = "#d63031";
  if(type === "warning") backgroundColor = "#fdcb6e";

  Toast.show({
    title: type,
    description: message,
    placement: "top",
    duration: 3000,
    variant: "solid",
    isClosable: true,
    style: {
      backgroundColor,
      borderRadius: 10,
      padding: 15,
      margin: 10,
      width: "100%",
      alignSelf: "center",
    },
  })
}


export const UserProvider = ({children})=>{
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user) => {
    dispatch({
      type: userActionTypes.SET_USER,
      user,
    });
  };

  const setConfirmationEmail = (confirmationEmail) => {
    dispatch({
      type: userActionTypes.SET_CONFIRMATION_EMAIL,
      confirmationEmail,
    });
  };

  const createJourneyLoading = (createJourneyLoadingState) => {
    dispatch({
      type: userActionTypes.CREATE_JOURNEY_LOADING,
      createJourneyLoadingState
    })

  }

  const createJourney = async ( title, description, content, descHTML,category , callback) =>{
    const journeyId = uuidv4();
    try{
      createJourneyLoading(true)
      const createdJourney  = await API.post('journeyapp', `/user/${state.user.username}`, {
        body: {
          journeyId ,
          title,
          createdAt: Date.now().toString(),
          description,
          descHTML,
          category,
          content,
        }
      })
      dispatch({
        type: userActionTypes.CREATE_JOURNEY,
        createdJourney
      })
      createJourneyLoading(false)
      if(callback) callback()

       handleNotification("Journey created successfully", "success")


    } catch (err) {
      createJourneyLoading(false)
      console.log(err)
      handleNotification("Error creating journey", "error")
    }
  } 

  const getJourneyLoading = (getJourneyLoadingState) =>{
    dispatch({
      type: userActionTypes.GET_JOURNEY_BY_USER_LOADING,
      getJourneyLoadingState
    })
  }

  const getJourney = async () =>{
    try{
      getJourneyLoading(true);
      const journeys = await API.get('journeyapp', `/user/${state.user.username}`)
      dispatch({
        type: userActionTypes.GET_JOURNEY_BY_USER,
        journeys
      })
      getJourneyLoading(false);
    }catch(err){
      getJourneyLoading(false)
      console.log(err)
    }
  }

  const getCategories = async () =>{
    try{
      getCategoriesLoading(true)
      if(state.user === null || state.user.username === null ) return
      const categories = await API.get('journeyapp', `/categories`)

         const unique = categories.categories.reduce((acc, journey) => {
            if (!journey) return acc;
           const category = journey;
           const categoryObj = acc.find(obj => obj.category === category);
           if (categoryObj) {
             categoryObj.count++;
           } else {
             acc.push({category, count: 1});
           }
           
           return acc;
         }, []);
      dispatch({
        type: userActionTypes.GET_CATEGORIES,
        categories: unique
      })
      getCategoriesLoading(false)
    }catch(err){
      console.log(err)
      getCategoriesLoading(false)
    }
  }


  const addCategory = (category) =>{
    dispatch({
      type: userActionTypes.ADD_CATEGORY,
      category
    })
  }

  const getCategoriesLoading = (getCategoriesLoading) =>{
    dispatch({
      type: userActionTypes.GET_CATEGORIES_LOADING,
      getCategoriesLoading
    })
  }


  const getJourneyByCategory = async (category) =>{
    try{
      const journeysByCategory = await API.get('journeyapp', `/categories?category=${category}`)
      dispatch({
        type: userActionTypes.GET_JOURNEY_BY_CATEGORY,
        journeysByCategory
      })
    }catch(err){
      console.log(err)
    }
  }

  const getJourneyByCategoryLoading = (getJourneyByCategoryLoadingState) =>{
    dispatch({
      type: userActionTypes.GET_JOURNEY_BY_CATEGORY_LOADING,
      getJourneyByCategoryLoadingState
    })
  }
  // /user/{userId}/journey/{journeyId}
  const getJourneyById = async (journeyId ) =>{
    try{
      const journeyById = await API.get('journeyapp', `/user/${state.user.username}/journey/${journeyId}`)
      dispatch({
        type: userActionTypes.GET_JOURNEY_BY_CATEGORY,
        journeyById
      })
      console.log(journeyById)
      return journeyById 
    }catch(err){
      console.log(err)
    }
  }

  const getJourneyByIdLoading = (getJourneyByIdLoadingState) =>{
    dispatch({
      type: userActionTypes.GET_JOURNEY_BY_CATEGORY_LOADING,
      getJourneyByIdLoadingState
    })
  }


  const deleteJourneyLoading = (deleteJourneyLoading) =>{
    dispatch({
      type: userActionTypes.DELETE_JOURNEY_LOADING,
      deleteJourneyLoading
    })
  }

// /user/{userId}/{params}

// partation key and sort key
  const deleteJourney = async (journeyId, createdAt, callback  ) =>{
    const myInit = {
      body: {
        journeyId,
        createdAt
      }
    }

    try{
      deleteJourneyLoading(true)
      const deletedJourney = await API.del('journeyapp', `/user/${state.user.username}/${journeyId}`, myInit)
      dispatch({
        type: userActionTypes.DELETE_JOURNEY,
        deletedJourney
      })
      deleteJourneyLoading(false)
      console.log('deleted Journey' +deletedJourney )
      handleNotification("Journey deleted successfully", "success")
      if(callback) callback()
    }catch(err){
      deleteJourneyLoading(false)
      console.log(err)
      handleNotification("Journey not deleted", "error")
    }
  }

  const updateJourneyLoading = (updateJourneyLoading) =>{
    dispatch({
      type: userActionTypes.UPDATE_JOURNEY_LOADING,
      updateJourneyLoading
    })
  }

  const updateJourney = async (journeyId, title, description, content) =>{
    try{
      updateJourneyLoading(true)
      const updatedJourney = await API.put('journeyapp', `/user/${state.user.username}/${journeyId}`, {
        body: {
          title,
          description,
          content
        }
      })
      dispatch({
        type: userActionTypes.UPDATE_JOURNEY,
        updatedJourney
      })
      updateJourneyLoading(false)
      handleNotification('Journey Updated', 'success')
    }catch(err){
      updateJourneyLoading(false)
      console.log(err)
      handleNotification('Journey Update Failed', 'error')
    }
  }

  const value = {
    user: state.user,
    confirmationEmail: state.confirmationEmail,
    journeys: state.journeys,
    categories: state.categories,
    journeysByCategory: state.journeysByCategory,
    journeyById: state.journeyById,
    setUser,
    setConfirmationEmail,
    createJourneyLoading,
    createJourney,
    getJourney,
    getJourneyLoading,
    deleteJourney,
    deleteJourneyLoading,
    updateJourney,
    updateJourneyLoading,
    getJourneyByCategory,
    getJourneyByCategoryLoading,
    getCategories,
    getCategoriesLoading,
    getJourneyById,
    getJourneyByIdLoading,
    addCategory,
    getCategoriesLoading
  };


  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
};

const useAppContext = () => {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error("useContext must be used within UserContext")
  }
  
  return context;
}
  
export default useAppContext;