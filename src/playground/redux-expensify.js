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

// Sort by Amount Action
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

// Sort by Date Action
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

// Set Start Date Action
const setStartDate = date => ({
  type: "SET_START_DATE",
  date
});

// Set End Date Action
const setEndDate = date => ({
  type: "SET_END_DATE",
  date
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
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.date
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.date
      };
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter(expense => {
    const startDateMatch =
      typeof startDate !== "number" || expense.createdAt >= startDate;
    const endDateMatch =
      typeof endDate !== "number" || expense.createdAt <= endDate;
    const textMatch = expense.description
      .toLowerCase()
      .includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  });
};

// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100, createdAt: 1000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 300, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter(""));

// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

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
