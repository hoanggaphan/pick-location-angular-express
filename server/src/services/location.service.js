import axios from 'axios';
import { db } from '../configs/db.config.js';
import CustomError from '../helpers/CustomError.js';

const Location = db.locations;

export const getAllLocation = async () => {
  try {
    return await Location.findAll();
  } catch (error) {
    throw error;
  }
};

export const getLocation = async (id) => {
  try {
    const location = await Location.findByPk(id);
    if (!location) {
      throw new CustomError('Location not found', 404);
    }

    return location;
  } catch (error) {
    throw error;
  }
};

export const createLocation = async (data) => {
  try {
    return await Location.create(data);
  } catch (error) {
    throw error;
  }
};

export const submit = async (data) => {
  try {
    const { userId, lat, lng } = data;
    const ggApiKey = process.env.GG_API_KEY;
    const ggPlacesUrl = `https://places.googleapis.com/v1/places:searchNearby`;

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
    const nearbyLocations = [];

    for (const l of res.data.places) {
      const locationInDB = await Location.findOne({ where: { placeId: l.id } });
      if (!locationInDB) {
        nearbyLocations.push({
          userId,
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

    if (nearbyLocations.length > 0) {
      await Location.bulkCreate(nearbyLocations);
    }

    return nearbyLocations;
  } catch (error) {
    throw error;
  }
};

export const updateLocation = async (id, data) => {
  try {
    const location = await Location.update(data, { where: { id } });
    if (!location[0]) {
      throw new CustomError('Location not found', 404);
    }
    return {
      message: 'Location was updated successfully!',
    };
  } catch (error) {
    throw error;
  }
};

export const deleteLocation = async (id) => {
  try {
    const location = await Location.destroy({
      where: { id },
    });
    if (!location) {
      throw new CustomError('Location not found', 404);
    }
    return { message: 'Location was deleted successfully!' };
  } catch (error) {
    throw error;
  }
};
