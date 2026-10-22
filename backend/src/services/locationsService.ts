
import * as locationsRepository from "../repositories/locationsRepository.js";
import type {
  Location,
  CreateLocationInput,
} from "../models/location.js";

export const getLocations = (
  accountId: number,
): Promise<Location[]> =>
  locationsRepository.getAllLocations(accountId);

export const getLocationById = (
  id: number,
  accountId: number,
): Promise<Location | null> =>
  locationsRepository.getLocationById(id, accountId);

export const createLocation = (
  location: CreateLocationInput,
  accountId: number,
): Promise<Location> =>
  locationsRepository.createLocation(location, accountId);

export const updateLocation = (
  id: number,
  updates: Partial<CreateLocationInput>,
  accountId: number,
): Promise<Location | null> =>
  locationsRepository.updateLocation(id, updates, accountId);

export const deleteLocation = (
  id: number,
  accountId: number,
): Promise<boolean> =>
  locationsRepository.deleteLocation(id, accountId);

export const getLocationCount = (
  accountId: number,
): Promise<number> =>
  locationsRepository.getLocationCount(accountId);
