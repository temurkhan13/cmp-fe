// src/redux/middleware/setDefaultWorkspaceAndFolder.js
import { setSelectedWorkspaceId } from '../slices/workspaceSlice';
import { setSelectedFolderId } from '../slices/folderSlice';
import { addWorkspace } from '../slices/workspaceSlice';
import { addFolder } from '../slices/folderSlice';
import { v4 as uuidv4 } from 'uuid';

const setDefaultWorkspaceAndFolder = store => next => action => {
  const { dispatch, getState } = store;
  const { workspaces } = getState().workspace;
  const { folders } = getState().folder;

  if (workspaces.length === 0) {
    const defaultWorkspaceId = uuidv4();
    dispatch(addWorkspace({ workspaceId: defaultWorkspaceId, name: 'Default Workspace' }));
    dispatch(setSelectedWorkspaceId(defaultWorkspaceId));

    const defaultFolderId = uuidv4();
    dispatch(addFolder({ folderId: defaultFolderId, name: 'Default Folder', workspaceId: defaultWorkspaceId }));
    dispatch(setSelectedFolderId(defaultFolderId));
  } else if (folders.length === 0) {
    const defaultFolderId = uuidv4();
    const selectedWorkspaceId = workspaces[0].workspaceId;
    dispatch(addFolder({ folderId: defaultFolderId, name: 'Default Folder', workspaceId: selectedWorkspaceId }));
    dispatch(setSelectedFolderId(defaultFolderId));
  }

  return next(action);
};

export default setDefaultWorkspaceAndFolder;
