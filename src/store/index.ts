import { createStore } from 'vuex';
import axios from 'axios';
import { Item, Project } from '../ts/interfaces';
import { actionType } from '../ts/store/actionType';
const url = 'https://assitant-app.netlify.app/api/projects-api';
const getLocalStorage = () => {
  let todoList = localStorage.getItem('VuextodoListTs');
  if (todoList) {
    return (todoList = JSON.parse(
      localStorage.getItem('VuextodoListTs') as string
    ));
  } else {
    return [];
  }
};
let timeOut = 0;
const saveLocalStorage = (todoList: Item[]) => {
  localStorage.setItem('VuextodoListTs', JSON.stringify(todoList));
};

export default createStore({
  state: {
    projects: [] as Project[],
    todoList: getLocalStorage(),
    showAlert: false,
    isEditing: false,
    ItemID: '',
    ItemValue: '',
    // timeOut: 0,
    alertMessege: {
      messege: '',
      type: '',
    },
  },

  mutations: {
    GET_PROJECTS(state, payload: Project[]) {
      state.projects = payload;
    },
    UPDATE_MESSAGE(state, payload) {
      state.ItemValue = payload;
    },
    ADD_ITEM(state) {
      const todoItem = {
        id: new Date().getTime().toString(),
        value: state.ItemValue,
        isComplete: false,
      };
      state.ItemValue = '';
      state.todoList.push(todoItem);
      saveLocalStorage(state.todoList);
    },
    UPDATE_INPUT(state) {
      const tempList = state.todoList.map((item: Item) => {
        if (item.id === state.ItemID) {
          return { ...item, value: state.ItemValue };
        }
        return item;
      });
      state.todoList = tempList;
      state.isEditing = false;
      state.ItemID = '';
      state.ItemValue = '';
      saveLocalStorage(state.todoList);
    },
    REMOVE_ALL(state) {
      state.todoList = [];
      state.isEditing = false;
      saveLocalStorage(state.todoList);
    },

    EDIT_ITEM(state, payload) {
      const specificItem = state.todoList.find(
        (item: Item) => item.id === payload
      );
      state.ItemID = payload;
      state.ItemValue = specificItem.value;
      state.isEditing = true;
    },

    TOOGLE_COMPLETE(state, payload) {
      const completedList = state.todoList.map((item: Item) => {
        if (item.id === payload) {
          return { ...item, isComplete: !item.isComplete };
        }
        return item;
      });
      state.isEditing = false;
      state.ItemValue = '';
      state.todoList = completedList;
      saveLocalStorage(state.todoList);
    },
    DELETE_ITEM(state, payload) {
      const todoList = state.todoList.filter(
        (item: Item) => item.id !== payload
      );
      state.isEditing = false;
      state.ItemValue = '';
      state.todoList = todoList;
      saveLocalStorage(state.todoList);
    },
    DISPLAY_ALERT(state, payload) {
      state.alertMessege = payload;
      state.showAlert = true;

      clearTimeout(timeOut);

      if (!state.isEditing) {
        timeOut = setTimeout(() => {
          state.showAlert = false;
        }, 1500);
      }
    },
  },
  actions: {
    async GET_PROJECTS(context) {
      try {
        const response = await axios.get(url);
        const data = await response.data;
        context.commit('GET_PROJECTS', data);
      } catch (error) {
        console.log(error);
      }
    },
    UPDATE_MESSAGE(context, payload) {
      context.commit(actionType.UPDATE_MESSAGE, payload);
    },
    FORM_SUBMIT({ commit, state }) {
      if (state.isEditing) {
        commit(actionType.UPDATE_INPUT);
        const alertMessege = {
          messege: 'Task Edited',
          type: 'success',
        };
        commit(actionType.DISPLAY_ALERT, alertMessege);
      } else {
        commit(actionType.ADD_ITEM);
        const alertMessege = {
          messege: 'New',
          type: 'success',
        };
        commit(actionType.DISPLAY_ALERT, alertMessege);
      }
    },
    EDIT_ITEM(context, payload) {
      context.commit(actionType.EDIT_ITEM, payload);
      const alertMessege = {
        messege: 'Editing...',
        type: 'warning',
      };
      context.commit(actionType.DISPLAY_ALERT, alertMessege);
    },
    TOOGLE_COMPLETE({ commit, state }, payload) {
      commit(actionType.TOOGLE_COMPLETE, payload);
      state.todoList.find((item: Item) => {
        if (item.isComplete === true) {
          const alertMessege = {
            messege: 'Task Completed',
            type: 'success',
          };
          commit(actionType.DISPLAY_ALERT, alertMessege);
        }
      });
    },
    DELETE_ITEM(context, payload) {
      context.commit(actionType.DELETE_ITEM, payload);
      const alertMessege = {
        messege: 'Task Deleted',
        type: 'danger',
      };
      context.commit(actionType.DISPLAY_ALERT, alertMessege);
    },
    REMOVE_ALL({ commit }) {
      commit(actionType.REMOVE_ALL);
      const alertMessege = {
        messege: 'All items removed',
        type: 'danger',
      };
      commit(actionType.DISPLAY_ALERT, alertMessege);
    },
  },
});
