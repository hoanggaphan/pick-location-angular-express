import axios from 'axios';
import { db } from '../configs/db.config.js';
import CustomError from '../helpers/CustomError.js';

const Submission = db.submissions;
const Location = db.locations;

export const getAllSubmission = async () => {
  try {
    return await Submission.findAll();
  } catch (error) {
    throw error;
  }
};

export const getSubmission = async (id) => {
  try {
    const submission = await Submission.findByPk(id);
    if (!submission) {
      throw new CustomError('Location not found', 404);
    }

    return submission;
  } catch (error) {
    throw error;
  }
};

export const createSubmission = async (data) => {
  try {
    return await Submission.create(data);
  } catch (error) {
    throw error;
  }
};

export const submit = async (data) => {
  try {
    const ggApiKey = process.env.GG_API_KEY;
    const ggPlacesUrl = process.env.GG_PLACES_URL;
    const { userId, lat, lng } = data;

    const body = {
      includedTypes: ['school', 'hospital', 'park', 'supermarket'],
      maxResultCount: 20,
      rankPreference: 'DISTANCE',
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: 20000,
        },
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': ggApiKey,
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.types,places.location,places.formattedAddress',
    };

    const res = await axios.post(ggPlacesUrl, body, { headers });

    const newSubmission = await createSubmission({
      userId,
      latitude: lat,
      longitude: lng,
    });

    const nearbyLocations = [];
    for (const l of res.data.places) {
      const locationInDB = await Location.findOne({ where: { placeId: l.id } });
      if (!locationInDB) {
        nearbyLocations.push({
          submissionId: newSubmission.id,
          placeId: l.id,
          name: l.displayName.text,
          latitude: l.location.latitude,
          longitude: l.location.longitude,
          address: l.formattedAddress,
          types: l.types,
          status: 'pending',
        });
      }
    }

    let createdLocations;
    if (nearbyLocations.length > 0) {
      createdLocations = await Location.bulkCreate(nearbyLocations);
    }

    return createdLocations || nearbyLocations;
  } catch (error) {
    throw error;
  }
};

export const updateSubmission = async (id, data) => {
  try {
    const submission = await Submission.update(data, { where: { id } });
    if (!submission[0]) {
      throw new CustomError('Submission not found', 404);
    }
    return {
      message: 'Submission was updated successfully!',
    };
  } catch (error) {
    throw error;
  }
};

export const deleteSubmission = async (id) => {
  try {
    const submission = await Submission.destroy({
      where: { id },
    });
    if (!submission) {
      throw new CustomError('Submission not found', 404);
    }
    return { message: 'Submission was deleted successfully!' };
  } catch (error) {
    throw error;
  }
};
