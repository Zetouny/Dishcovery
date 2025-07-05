import jwt from "jsonwebtoken";
import crypto from "crypto";
import { USERS_DATABASE } from "./usersController.js";

const MESSAGES_DATABASE = [];
const TOKEN_KEY = "SECUREDHASEDSECRETCODE";

export const getAllMessages = async (req, res) => {
  const tokenUserID = verifyToken(req, res);
  if (!tokenUserID) return;

  const filterMessages = MESSAGES_DATABASE.filter(
    (message) =>
      message.senderID == tokenUserID || message.receiverID == tokenUserID
  );

  if (filterMessages.length === 0) {
    return res.status(404).json({ error: "No Messages found" });
  }

  res.json(filterMessages);
};

export const sendMessage = async (req, res) => {
  const { receiverID, message } = req.body;
  const tokenUserID = verifyToken(req, res);
  if (!tokenUserID) return;

  if (!receiverID || !message) {
    return res.status(400).json({ error: "Missing request body" });
  }

  const findUser = USERS_DATABASE.find((user) => user.id == receiverID);
  if (!findUser) {
    return res.status(404).json({ error: "No receiver found with this ID" });
  }

  if (message.trim().length === 0) {
    return res.status(400).json({ error: "Empty messages are not allowed" });
  }

  if (receiverID == tokenUserID) {
    return res
      .status(400)
      .json({ error: "You can't send message to yourself!" });
  }

  const messageData = {
    id: crypto.randomUUID(),
    senderID: tokenUserID,
    receiverID,
    message,
  };

  MESSAGES_DATABASE.push(messageData);

  res.json(messageData);
};

export const updateMessage = async (req, res) => {
  const messageID = req.params.id;
  const newMessage = req.body.message;
  const tokenUserID = verifyToken(req, res);
  if (!tokenUserID) return;

  if (!messageID) {
    return res.status(400).json({ error: "Message id is missing" });
  }

  if (!newMessage) {
    return res.status(400).json({ error: "Message content is missing" });
  }

  if (newMessage.trim().length === 0) {
    return res.status(400).json({ error: "Empty messages are not allowed" });
  }

  const findMessage = MESSAGES_DATABASE.find(
    (message) => message.id === messageID
  );
  if (!findMessage) {
    return res.status(404).json({ error: "No message found with this ID" });
  }

  if (findMessage.senderID !== tokenUserID) {
    return res
      .status(403)
      .json({ error: "You don't have permission to edit this message" });
  }

  const findMessageIndex = MESSAGES_DATABASE.findIndex(
    (message) => message.id === messageID
  );

  MESSAGES_DATABASE[findMessageIndex].message = newMessage;

  res.json(MESSAGES_DATABASE[findMessageIndex]);
};

export const deleteMessage = async (req, res) => {
  const messageID = req.params.id;
  const tokenUserID = verifyToken(req, res);
  if (!tokenUserID) return;

  if (!messageID) {
    return res.status(400).json({ error: "Message id is missing" });
  }

  const findMessage = MESSAGES_DATABASE.find(
    (message) => message.id === messageID
  );
  if (!findMessage) {
    return res.status(404).json({ error: "No message found with this ID" });
  }

  if (findMessage.senderID !== tokenUserID) {
    return res
      .status(403)
      .json({ error: "You don't have permission to delete this message" });
  }

  const findMessageIndex = MESSAGES_DATABASE.findIndex(
    (message) => message.id === messageID
  );

  MESSAGES_DATABASE.splice(findMessageIndex, 1);
  res.end();
};

const verifyToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ error: "You need to login first" });
    return;
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const verifyToken = jwt.verify(token, TOKEN_KEY);

    return verifyToken.id;
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};
