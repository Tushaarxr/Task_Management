// src/redux/features/tasks/taskSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  fetchTasks, 
  fetchTaskById, 
  createTask, 
  updateTask, 
  deleteTask,
  Task,
  CreateTaskDto,
  UpdateTaskDto
} from '../../../services/api';

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  selectedTask: Task | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  // Search and filters
  searchTerm: string;
  statusFilter: string;
}

const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
  selectedTask: null,
  status: 'idle',
  error: null,
  // Pagination
  currentPage: 1,
  itemsPerPage: 6,  // Show 6 tasks per page
  totalItems: 0,
  // Search and filters
  searchTerm: '',
  statusFilter: '',
};

export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAllTasks',
  async () => {
    return await fetchTasks();
  }
);

export const fetchTask = createAsyncThunk(
  'tasks/fetchTask',
  async (id: string) => {
    return await fetchTaskById(id);
  }
);

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (task: CreateTaskDto) => {
    return await createTask(task);
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async ({ id, task }: { id: string; task: UpdateTaskDto }) => {
    return await updateTask(id, task);
  }
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id: string) => {
    await deleteTask(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when search changes
      applyFilters(state);
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
      state.currentPage = 1; // Reset to first page when filter changes
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.statusFilter = '';
      state.filteredTasks = state.tasks;
      state.totalItems = state.tasks.length;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all tasks
      .addCase(fetchAllTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        
        // Apply any existing filters to the new tasks
        applyFilters(state);
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      
      // Fetch single task
      .addCase(fetchTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        state.selectedTask = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch task';
      })
      
      // Add new task
      .addCase(addNewTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
        
        // Apply filters to include the new task if it matches current filters
        applyFilters(state);
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create task';
      })
      
      // Edit task
      .addCase(editTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.selectedTask = action.payload;
        
        // Apply filters to update the filtered task list
        applyFilters(state);
      })
      .addCase(editTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update task';
      })
      
      // Remove task
      .addCase(removeTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
        if (state.selectedTask && state.selectedTask._id === action.payload) {
          state.selectedTask = null;
        }
        
        // Apply filters to update the filtered task list
        applyFilters(state);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

// Helper function to apply filters to the tasks
const applyFilters = (state: TaskState) => {
  let result = [...state.tasks];
  
  // Apply search filter
  if (state.searchTerm) {
    const searchTermLower = state.searchTerm.toLowerCase();
    result = result.filter(task => 
      task.title.toLowerCase().includes(searchTermLower) ||
      task.description.toLowerCase().includes(searchTermLower)
    );
  }
  
  // Apply status filter
  if (state.statusFilter) {
    result = result.filter(task => task.status === state.statusFilter);
  }
  
  state.filteredTasks = result;
  state.totalItems = result.length;
  
  // Adjust current page if it's now out of bounds
  const maxPage = Math.max(1, Math.ceil(result.length / state.itemsPerPage));
  if (state.currentPage > maxPage) {
    state.currentPage = maxPage;
  }
};

export const { 
  clearSelectedTask,
  setCurrentPage,
  setSearchTerm,
  setStatusFilter,
  clearFilters
} = taskSlice.actions;

// Selector to get paginated tasks
export const selectPaginatedTasks = (state: { tasks: TaskState }) => {
  const { filteredTasks, currentPage, itemsPerPage } = state.tasks;
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filteredTasks.slice(startIndex, startIndex + itemsPerPage);
};

export default taskSlice.reducer;