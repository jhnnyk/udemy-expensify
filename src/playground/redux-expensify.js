import { createStore, combineReducers } from "redux";

const demoState = {
  expenses: [
    {
      id: "asflkj",
      description: "January Mortgage",
      note: "Thankful to have a mortgage :-)",
      amount: 310597,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // date or amount
    startDate: undefined,
    endDate: undefined
  }
};
