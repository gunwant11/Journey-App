export const initialState = {
  user: null,
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

  default:
    return state;
  }
}

export default userReducer