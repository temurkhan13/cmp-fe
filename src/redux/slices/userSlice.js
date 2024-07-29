import { createSlice } from '@reduxjs/toolkit';

const initialUserState = [
  {
    userId: 'userId1',
    name: 'Jerald Huels',
    role: 'Editor',
    image: '/src/assets/dashboard/User1.svg',
  },
  {
    userId: 'userId2',
    name: 'Sherrimac Gyver',
    role: 'Editor',
    image: '/path/to/image2.jpg',
  },
  {
    userId: 'userId3',
    name: 'Alex Doe',
    role: 'Viewer',
    image: '/src/assets/dashboard/User1.svg',
  },
  {
    userId: 'userId4',
    name: 'Jane Smith',
    role: 'Editor',
    image: '/src/assets/dashboard/User2.svg',
  },
  {
    userId: 'userId5',
    name: 'JaMe SmithII',
    role: 'Editor',
    image: '/src/assets/dashboard/User3.svg',
  },
];

const initialState = {
  users: initialUserState, // This will hold the user details
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { userId, updatedUser } = action.payload;
      const userIndex = state.users.findIndex((user) => user.userId === userId);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updatedUser };
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.userId !== userId);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
