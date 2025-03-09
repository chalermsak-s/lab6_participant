import express, { Request, Response } from "express";
import * as service from "../services/eventService";
import type { Event } from "../models/event";
import type { Participant } from "../models/participant";
import exp from "constants";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  if (req.query.pageSize && req.query.pageNo) {
    const pageSize = parseInt(req.query.pageSize as string) || 3;
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const keyword = req.query.keyword as string;
    try {
      const result = await service.getAllEventsWithPagination(
        keyword,
        pageSize,
        pageNo
      );
      if (result.events.length === 0) {
        res.status(404).send("No event found");
        return;
      }
      res.setHeader("x-total-count", result.count.toString());
      res.setHeader("Access-Control-Expose-Headers", "x-total-count");
      res.json(result.events);
    } catch (error) {
      if (pageNo < 1 || pageSize < 1) {
        res.status(400).send("Invalid pageNo or pageSize");
      } else {
        res.status(500).send("Internal Server Error");
      }
      return;
    } finally {
      console.log(
        `Request is completed. with pageNo=${pageNo} and pageSize=${pageSize}`
      );
    }
  } else if (req.query.category) {
    const category = req.query.category;
    res.json(await service.getAllEvents());
  } else {
    res.json(await service.getAllEvents());
  }
});

router.get("/participant", async (req: Request, res: Response) => {
  if (req.query.pageSize && req.query.pageNo) {
    const pageSize = parseInt(req.query.pageSize as string) || 3;
    const pageNo = parseInt(req.query.pageNo as string) || 1;
    const keyword = req.query.keyword as string || "";
    try {
      const result = await service.getAllParticipantPage(
        keyword,
        pageSize,
        pageNo
      );
      if (result.participants.length === 0) {
        res.status(404).send("No Participants found");
        return;
      }
      res.setHeader("x-total-count", result.count.toString());
      res.setHeader("Access-Control-Expose-Headers", "x-total-count");
      res.json(result.participants);
    } catch (error) {
      if (pageNo < 1 || pageSize < 1) {
        res.status(400).send("Invalid pageNo or pageSize");
      } else {
        res.status(500).send("Internal Server Error");
      }
      return;
    } finally {
      console.log(
        `Request is completed. with pageNo=${pageNo} and pageSize=${pageSize}`
      );
    }
  } else if (req.query.title) {
    const title = req.query.title;
    res.json(await service.getAllParticipants());
  } else {
    res.json(await service.getAllParticipants());
  }
});

// router.get("/", async (req: Request, res: Response) => {
//   const events = await service.getAllEvents();
//   if (req.query.category) {
//     const category = req.query.category;
//     const filteredEvents = events.filter((event) => event.category === category);
//     res.json(filteredEvents);
//     } else {
//     res.json(events);
//     }
// });

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const event = await service.getEventById(id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).send("Event not found");
  }
});

router.get("/participant/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const participant = await service.getParticipantId(id);
  if (participant) {
    res.json(participant);
  } else {
    res.status(404).json({ message: "Participant not found" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const newEvent: Event = req.body;
  const result = await service.addEvent(newEvent);
  res.json(result);
});

export default router;
