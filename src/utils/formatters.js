export const capitalizeFirstLetter = (value) => {
  if (!value) {
    return "";
  }
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

// create new Arr and dont effect on  original array
export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return [];

  const clonedArray = [...originalArray];
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  });

  return orderedArray;
};

/**
 * Example:
const originalItems = [
  { id: "id-1", name: "One" },
  { id: "id-2", name: "Two" },
  { id: "id-3", name: "Three" },
  { id: "id-4", name: "Four" },
  { id: "id-5", name: "Five" },
];
const itemOrderIds = ["id-5", "id-4", "id-2", "id-3", "id-1"];
const key = "id";

const orderedArray = mapOrder(originalItems, itemOrderIds, key);
console.log("Original:", originalItems);
console.log("Ordered:", orderedArray);
 */

export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column?._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true,
  };
};
