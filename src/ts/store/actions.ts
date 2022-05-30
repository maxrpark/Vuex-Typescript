import { actionType } from './actionType';
import { AlertMessege } from '../interfaces';

interface DISPLAY_ALERT {
  type: actionType.DISPLAY_ALERT;
  payload: AlertMessege;
}
interface UPDATE_INPUT {
  type: actionType.UPDATE_INPUT;
  payload: string;
}
interface ADD_ITEM {
  type: actionType.ADD_ITEM;
  payload: string;
}
interface EDIT_ITEM {
  type: actionType.EDIT_ITEM;
  payload: string;
}
interface EDITING_ITEM {
  type: actionType.EDITING_ITEM;
  payload: string;
}
interface DELETE_ITEM {
  type: actionType.DELETE_ITEM;
  payload: string;
}
interface TOOGLE_COMPLETE {
  type: actionType.TOOGLE_COMPLETE;
  payload: string;
}
interface REMOVE_ALL {
  type: actionType.REMOVE_ALL;
}

export type Actions =
  | DISPLAY_ALERT
  | UPDATE_INPUT
  | REMOVE_ALL
  | ADD_ITEM
  | EDIT_ITEM
  | EDITING_ITEM
  | TOOGLE_COMPLETE
  | DELETE_ITEM;
