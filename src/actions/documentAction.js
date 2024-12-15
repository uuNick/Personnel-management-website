import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILURE
} from '../actionTypes';
import DocumentService from "../services/documentService";

export const getAllDocuments = () => async (dispatch) => {
  dispatch({ type: FETCH_DOCUMENTS });
  try {
    const employees = await DocumentService.getAllDocuments();
    dispatch({ type: FETCH_DOCUMENTS_SUCCESS, payload: employees });
  } catch (error) {
    dispatch({ type: FETCH_DOCUMENTS_FAILURE, payload: error });
  }
};

