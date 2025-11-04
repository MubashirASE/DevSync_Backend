import { StandUp } from "../models/standup.model.js";

export const submitStandup = async (req, res) => {
  try {
    const { yesterday, today, blockers } = req.body;
    
    const userId = req.userId; 
    console.log(userId)
    console.log(yesterday,today,blockers)
    const startOfDay = new Date();
    console.log(startOfDay)
    startOfDay.setHours(0, 0, 0, 0);

    const existingEntry = await StandUp.findOne({
      userId,
      createdAt: { $gte: startOfDay }
    });

    if (existingEntry) {
      return res.json({
        success: false,
        message: "You already submitted today’s standup!"
      });
    }

    await StandUp.create({
      yesterday,
      today,
      blockers,
      userId
    });

    return res.json({
      success: true,
      message: "Standup submitted successfully!"
    });

  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Something went wrong"
    });
  }
};




export const getStandupDate = async (req, res) => {
  try {
    const { date } = req.query;
    console.log(date)
    if (!date) {
      return res.json({
        success: false,
        message: "Please provide a date (YYYY-MM-DD)"
      });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const standup= await StandUp.find({
      createdAt: { $gte: start, $lte: end }
    }).populate("userId", "name email");

    return res.json({
      success: true,
      data: standup
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Date search failed!"
    });
  }
};
export const getAllStandupData= async (req, res) => {
  try {

    const standup= await StandUp.find().populate("userId", "name email");
    console.log(standup)
    return res.json({
      success: true,
      data: standup
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Date search failed!"
    });
  }
};
