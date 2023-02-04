export const initialState = {
  user: {
    username: null
  },
  confirmationEmail:'gunwant7272@gmail.com',
  createJourneyLoading: false,
  createdJourney: null,
  getJourneyLoadingState: false,
  getJourney: null,
  categories: null,
  getJourneyByIdLoading: false,
  getJourneyByCategoryLoadingState: false,
  getJourneyByCategory: null,
  getCategories: null,
  deleteJourneyLoadingState: false,
  deleteJourney: null,
  updateJourneyLoading: false,
  updateJourney: null,
  journeys: null,
  journeysByCategory: null,
  journeyById: null,




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
        journeys: action.journeysByCategory.items
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
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, {
            category : action.category,
          }]

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