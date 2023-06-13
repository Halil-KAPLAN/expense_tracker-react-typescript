import { Record, RecordDispatch, RecordForm } from "../../types/record";
import api from "../../utils/api";

export const getRecords = () => async (dispatchEvent: RecordDispatch) => {
  dispatchEvent({ type: "GET_RECORDS_START" });
  try {
    const response = await api.get<Record[]>("/records");
    response.data.sort((a, b) => b.id - a.id);

    dispatchEvent({ type: "GET_RECORDS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatchEvent({ type: "GET_RECORDS_ERROR" });
  }
};

export const addRecord =
  (form: RecordForm) => async (dispatchEvent: RecordDispatch) => {
    dispatchEvent({ type: "ADD_RECORD_START" });
    try {
      const response = await api.post<Record>("/records", form);
      dispatchEvent({ type: "ADD_RECORD_SUCCESS", payload: response.data });
    } catch (error) {
      dispatchEvent({ type: "ADD_RECORD_ERROR" });
    }
  };

export const updateRecord =
  (form: RecordForm, id: Record["id"]) =>
  async (dispatchEvent: RecordDispatch) => {
    dispatchEvent({ type: "UPDATE_RECORD_START" });
    try {
      const response = await api.put<Record>("/records/" + id, form);
      dispatchEvent({ type: "UPDATE_RECORD_SUCCESS", payload: response.data });
    } catch (error) {
      dispatchEvent({ type: "UPDATE_RECORD_ERROR" });
    }
  };

export const deleteRecord =
  (id: number) => async (dispatchEvent: RecordDispatch) => {
    dispatchEvent({ type: "DELETE_RECORD_START" });
    try {
      await api.delete("/records/" + id);
      dispatchEvent({ type: "DELETE_RECORD_SUCCESS", payload: id });
    } catch {
      dispatchEvent({ type: "DELETE_RECORD_ERROR" });
    }
  };
