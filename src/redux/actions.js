export const SET_REGION_INFO = "SET_REGION_INFO";

export const setRegionInfo = (regionInfo) => ({
  type: SET_REGION_INFO,
  payload: regionInfo||null,
});
