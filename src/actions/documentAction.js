import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENTS_SUCCESS,
  FETCH_DOCUMENTS_FAILURE,
  FETCH_DOCUMENT_BY_ID_SUCCESS
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

export const getDocumentById = (document_id) => async (dispatch) => {
  dispatch({ type: FETCH_DOCUMENTS });
  try {
    const employees = await DocumentService.getDocumentById(document_id);
    dispatch({ type: FETCH_DOCUMENT_BY_ID_SUCCESS, payload: employees });
  } catch (error) {
    dispatch({ type: FETCH_DOCUMENTS_FAILURE, payload: error });
  }
}

