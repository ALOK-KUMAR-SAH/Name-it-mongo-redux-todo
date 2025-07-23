import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Base API
const API_URL = "http://localhost:5000/api/todos";

//  Fetch todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

//  Add todo
export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
});

//  Delete todo
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

//  Toggle complete
export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (id) => {
  const response = await axios.put(`${API_URL}/${id}/toggle`);
  return response.data;
});

//  Update todo (for editing)
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, text, time }) => {
    const response = await axios.put(`${API_URL}/${id}`, { text, time });
    return response.data;
  }
);

//  Slice
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch todos";
      })

      // Add
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // Delete
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo._id !== action.payload);
      })

      // Toggle
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      //  Update
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default todoSlice.reducer;
