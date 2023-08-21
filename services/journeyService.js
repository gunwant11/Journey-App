import { API, Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';

export const createJourney = async (username, title, description, content, descHTML, mood, imageKey) => {
  const journeyId = uuidv4();
  const payload = {
    journeyId,
    title,
    description,
    content,
    descHTML,
    mood,
    imageKey,
    createdAt: Date.now().toString(),
  };

  return API.post('journeyapp', `/user/${username}`, {
    body: payload
  });
};

export const getJourneys = async (username, createdAt, journeyId) => {
  const payload = {
    createdAt,
    journeyId
  };

  const journeys = await API.post('journeyapp', `/user/${username}/journey`, { body: payload });

  const journalsWithImages = await Promise.all(
    journeys.map(async (journey) => {
      if (journey.imageKey) {
        const imageUrl = await Storage.get(journey.imageKey);
        return { ...journey, imageUrl };
      }
      return journey;
    })
  );
  return journalsWithImages;
};

export const deleteJourney = async (username, journeyId, createdAt) => {
  const myInit = {
    body: {
      journeyId,
      createdAt
    }
  };

  return API.del('journeyapp', `/user/${username}/${journeyId}`, myInit);
};

export const updateJourney = async (username, journeyId, title, description, content) => {
  return API.put('journeyapp', `/user/${username}/${journeyId}`, {
    body: {
      title,
      description,
      content
    }
  });
};
