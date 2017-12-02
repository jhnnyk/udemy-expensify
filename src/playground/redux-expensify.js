import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// Add Expense Action
const addExpense = (
  { description = "", note = "", amount = 0, createdAt = 0 } = {}
) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// Remove Expense Action
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// Edit Expense Action
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

// Set Text Filter Action
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(exp => exp.id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(exp => {
        if (exp.id === action.id) {
          return {
            ...exp,
            ...action.updates
          };
        } else {
          return exp;
        }
      });
    default:
      return state;
  }
};

// Filters Reducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    default:
      return state;
  }
};

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 300 })
);

store.dispatch(removeExpense({ id: expenseOne.expense.id }));
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

store.dispatch(setTextFilter("rent"));
store.dispatch(setTextFilter(""));

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
