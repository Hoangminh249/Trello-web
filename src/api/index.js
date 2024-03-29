import axios from "axios";
import { API_ROOT } from "../utils/constants";

export const fetchBoardDetails = async (boardId) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  return res.data;
};

export const createNewColumn = async (newColumn) => {
  const res = await axios.post(`${API_ROOT}/v1/columns`, newColumn);
  return res.data;
};

export const createNewCard = async (newCard) => {
  const res = await axios.post(`${API_ROOT}/v1/cards`, newCard);
  return res.data;
};
