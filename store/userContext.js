import { createContext, useContext } from "react";
import userReducer, { initialState } from "./userReducer";
import React from "react";
import { useReducer } from "react";
import { API } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
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

}

const UserContext = createContext(initialState);


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

  const createJourney = async ( title, description, content, category) =>{
    const journeyId = uuidv4();
    try{
      createJourneyLoading(true)
      const createdJourney  = await API.post('journeyapp', `/user/${state.user.username}`, {
        body: {
          journeyId ,
          title,
          createdAt: Date.now().toString(),
          description,
          category,
          content,
        }
      })
      dispatch({
        type: userActionTypes.CREATE_JOURNEY,
        createdJourney
      })
      createJourneyLoading(false)
    } catch (err) {
      createJourneyLoading(false)
      console.log(err)
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
      const categories = await API.get('journeyapp', `/user/${state.user.username}/categories`)
      dispatch({
        type: userActionTypes.GET_CATEGORIES,
        categories
      })
    }catch(err){
      console.log(err)
    }
  }

  const getCategoriesLoading = (getCategoriesLoading) =>{
    dispatch({
      type: userActionTypes.GET_CATEGORIES_LOADING,
      getCategoriesLoading
    })
  }


  const getJourneyByCategory = async (category) =>{
    try{
      const journeysByCategory = await API.get('journeyapp', `/user/${state.user.username}/categories/${category}`)
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
  const getJourneyById = async (journeyId) =>{
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


  const deleteJourney = async (journeyId) =>{
    try{
      deleteJourneyLoading(true)
      const deletedJourney = await API.del('journeyapp', `/user/${state.user.username}/${journeyId}`)
      dispatch({
        type: userActionTypes.DELETE_JOURNEY,
        deletedJourney
      })
      deleteJourneyLoading(false)
    }catch(err){
      deleteJourneyLoading(false)
      console.log(err)
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
    }catch(err){
      updateJourneyLoading(false)
      console.log(err)
    }
  }

  const value = {
    user: state.user,
    confirmationEmail: state.confirmationEmail,
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
    getJourneyByIdLoading
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