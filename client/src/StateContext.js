import React, { createContext, useContext, useState, useEffect } from 'react';
import ingredients from "./data/Ingredients.json"
import recipes from "./data/Recipe.json"

const StateContext = createContext();

export function StateProvider({ children }) {
    const [outOfStock, setOutOfStock] = useState([])
    const [inStock, setInStock] = useState([])
    const [overrideStockCheck, setOverrideStockCheck] = useState(true)
    const [holiday, setHoliday] = useState('Halloween')
    
  
    function init() {
        let removedRecipes = []
        let keptRecipes = []
        let unavailableIngredients = []

      for (let i = 0; i < recipes.length; i++) {
        if(!removedRecipes.includes(recipes[i].drinkName) && !keptRecipes.includes(recipes[i].drinkName)) {
            let drinkList = recipes.filter(obj => obj.drinkName === recipes[i].drinkName)
            let missingIngs = getUnavailableIngredients(drinkList)
            if (missingIngs.length > 0) {
              unavailableIngredients.push(missingIngs)
              removedRecipes.push(recipes[i])
            } else {
              keptRecipes.push(recipes[i])
            }
        } 
      }
      setOutOfStock(removedRecipes)
      setInStock(keptRecipes)
    }

    function getUnavailableIngredients(drinkIngredients) {
        let unavailableIngredients = []
        for (let i = 0; i < drinkIngredients.length; i++) {
            let ing = ingredients.find(({ ingredient }) => ingredient === drinkIngredients[i].ingredient)
            if(!ing || !ing.inStock) {
                unavailableIngredients.push(drinkIngredients[i].ingredient)
            }
            
        }
        return unavailableIngredients
        
    }

    function checkStock(drink) {

        if(overrideStockCheck) {
          return true
        }

        if(outOfStock.find(({ drinkName }) => drinkName === drink)) {
          return false
        } else if (inStock.find(({ drinkName }) => drinkName === drink)) {
          return true
        }
        return false   
    }
  
    useEffect(() => {
      init()
    }, [])
  
    return (
      <StateContext.Provider value={{ 
          outOfStock,
          inStock,
          overrideStockCheck,
          holiday,
          checkStock
        }}>
        {children}
      </StateContext.Provider>
    );
  }
  
  export function useStateContext() {
    return useContext(StateContext);
  }