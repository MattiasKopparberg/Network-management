import * as locationsService from "../services/locationsService.js";
import { Request, Response, NextFunction } from "express";

export const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const locations = await locationsService.getLocations();

    return res.status(200).json(locations);

  } catch (err) {

    next(err);
  }
};

export const getLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        error: "Invalid location ID",
      });
    }

    const location = await locationsService.getLocationById(id);

    if (!location) {
      return res.status(404).json({
        error: "Location not found",
      });
    }

    return res.status(200).json(location);

  } catch (err) {

    next(err);
  }
};

export const getLocationCount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const count = await locationsService.getLocationCount();

    return res.status(200).json({ count });

  } catch (err) {

    next(err);
  }
};

export const createLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const locationData = req.body;

    const requiredFields = [
      "coordinates",
      "address",
      "floor",
    ];

    for (const field of requiredFields) {

      if (!locationData[field]) {
        return res.status(400).json({
          error: `${field} is required`,
        });
      }
    }

    const newLocation =
      await locationsService.createLocation(locationData);

    return res.status(201).json(newLocation);

  } catch (err) {

    next(err);
  }
};

export const updateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        error: "Invalid location ID",
      });
    }

    const updatedLocation =
      await locationsService.updateLocation(id, req.body);

    if (!updatedLocation) {
      return res.status(404).json({
        error: "Location not found",
      });
    }

    return res.status(200).json(updatedLocation);

  } catch (err) {

    next(err);
  }
};

export const deleteLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        error: "Invalid location ID",
      });
    }

    const deleted =
      await locationsService.deleteLocation(id);

    if (!deleted) {
      return res.status(404).json({
        error: "Location not found",
      });
    }

    return res.status(204).send();

  } catch (err) {

    next(err);
  }
};