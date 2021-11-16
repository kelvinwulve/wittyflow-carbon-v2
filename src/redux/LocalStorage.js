export const loadState = () => {
  try {
    const state = localStorage.getItem("state");
    if (state === null) {
      return { auth: {  } };
    }
   // console.log(JSON.parse(state).auth);
    return JSON.parse(state);
  } catch (error) {
    return undefined;
  }
};

// 

export const saveState = (state) => {
  try {
    const oldState = JSON.stringify(state);
    localStorage.setItem("state", oldState);
  } catch (error) {}
};
