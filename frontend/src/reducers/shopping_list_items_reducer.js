import { RECEIVE_SHOPPING_LIST_ITEMS} from "../actions/shopping_list_item_actions";

const shoppingListItemsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = { ...oldState };
  switch (action.type) {
    // right now, the shopping list state is reconstructed for every edit action
    case RECEIVE_SHOPPING_LIST_ITEMS:
      newState = {};
      action.shoppingListItems.forEach(item => {
        if (!newState[item.category]) {
          newState[item.category] = [];
          newState[item.category].push(item);
        } else {
          newState[item.category].push(item);
        }
      });
      return newState;
    default:
      return oldState;
  }
}

export default shoppingListItemsReducer; 