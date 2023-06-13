import moment from "moment";

export const availableSinceDate = (date) => {
  return moment(date).format("MM/DD/YYYY");
};
