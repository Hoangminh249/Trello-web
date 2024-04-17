import axios from "axios";
import { API_ROOT } from "../utils/constants";

// Board

export const fetchBoardDetails = async (boardId) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  return res.data;
};

export const updateBoardDetails = async (boardId, updateData) => {
  const res = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData);
  return res.data;
};

export const moveCardToOtherColumn = async (updateData) => {
  const res = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData);
  return res.data;
};

// Cards

export const createNewCard = async (newCard) => {
  const res = await axios.post(`${API_ROOT}/v1/cards`, newCard);
  return res.data;
};

// Columns
export const updateColumnDetails = async (columnId, updateData) => {
  const res = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData);
  return res.data;
};

export const createNewColumn = async (newColumn) => {
  const res = await axios.post(`${API_ROOT}/v1/columns`, newColumn);
  return res.data;
};
