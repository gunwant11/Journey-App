export const initialState = {
  user: {
    username: null
  },
  confirmationEmail:'gunwant7272@gmail.com',

};

const userReducer = (state =initialState , action) => {

  switch (action.type) {
  case "SET_USER":
    return {
      ...state,
      user: action.user,
    };
  case "SET_CONFIRMATION_EMAIL":
    return {
      ...state,
      confirmationEmail: action.confirmationEmail,
    };
  case "CREATE_JOURNEY_LOADING":
    return {
      ...state,
      createJourneyLoading: action.createJourneyLoading
    }
  case "CREATE_JOURNEY":
    return {
      ...state,
      createdJourney: action.createdJourney
    }
  case "GET_JOURNEY_BY_USER_LOADING":
    return {
      ...state,
      getJourneyLoadingState: action.getJourneyLoadingState
    }
  case "GET_JOURNEY_BY_USER":
    console.log('first', action.journeys)
    return {
      ...state,
      journeys: action.journeys
    }
  case "UPDATE_JOURNEY_LOADING":
    return {
      ...state,
      updateJourneyLoading: action.updateJourneyLoading
    }
  case "UPDATE_JOURNEY":
    return {
      ...state,
      updateJourney: action.updateJourney
    }
  case "DELETE_JOURNEY_LOADING":
    return {
      ...state,
      deleteJourneyLoading: action.deleteJourneyLoading
    }
  case "DELETE_JOURNEY":
    return {
      ...state,
      deleteJourney: action.deleteJourney
    }
    case "GET_JOURNEY_BY_CATEGORY":
      return {
        ...state,
        journeysByCategory: action.journeysByCategory
      }
    case "GET_JOURNEY_BY_CATEGORY_LOADING":
      return {
        ...state,
        getJourneyByCategoryLoadingState : action.getJourneyByCategoryLoadingState
      }
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.categories
      }
    case "GET_CATEGORIES_LOADING":
      return {
        ...state,
        getCategoriesLoading: action.getCategoriesLoading

      }
    case "GET_JOURNEY_BY_ID":
      return {
        ...state,
        journeyById: action.journeyById
      }
    case "GET_JOURNEY_BY_ID_LOADING":
      return {
        ...state,
        getJourneyByIdLoading: action.getJourneyByIdLoading
      }
  default:
    return state;
  }
}

export default userReducer