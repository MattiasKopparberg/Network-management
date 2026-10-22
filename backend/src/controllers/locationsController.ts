
import type { Request, Response, NextFunction } from "express";
import * as locationsService from "../services/locationsService.js";

export const getLocations = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accountId = res.locals.accountId as number;
    const locations = await locationsService.getLocations(accountId);
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
    const accountId = res.locals.accountId as number;
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid location ID" });
    }

    const location = await locationsService.getLocationById(id, accountId);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    return res.status(200).json(location);
  } catch (err) {
    next(err);
  }
};

export const getLocationCount = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accountId = res.locals.accountId as number;
    const count = await locationsService.getLocationCount(accountId);
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
    const accountId = res.locals.accountId as number;
    const locationData = req.body;

    for (const field of ["coordinates", "address", "floor"]) {
      if (
        locationData[field] === undefined ||
        locationData[field] === null ||
        locationData[field] === ""
      ) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const newLocation = await locationsService.createLocation(
      locationData,
      accountId,
    );

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
    const accountId = res.locals.accountId as number;
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid location ID" });
    }

    const updatedLocation = await locationsService.updateLocation(
      id,
      req.body,
      accountId,
    );

    if (!updatedLocation) {
      return res.status(404).json({ error: "Location not found" });
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
    const accountId = res.locals.accountId as number;
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid location ID" });
    }

    const deleted = await locationsService.deleteLocation(id, accountId);

    if (!deleted) {
      return res.status(404).json({ error: "Location not found" });
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};
