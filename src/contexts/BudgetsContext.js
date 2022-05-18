import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const useBudgets = () => {
    return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter(expense => expense.budgetId === budgetId);
    }

    const addBudget = ({ name, max }) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }

    const addExpense = ({ amount, description, budgetId }) => {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), amount, description, budgetId }]
        })
    }

    const deleteBudget = ({ id }) => {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id);
        })
    }

    const deleteExpense = ({ id }) => {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== expense);
        })
    }

    return(
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addBudget,
            addExpense,
            deleteBudget,
            deleteExpense
        }} >{children}</BudgetsContext.Provider>
    )
}