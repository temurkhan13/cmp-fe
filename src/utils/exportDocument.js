import apiClient from '@api/axios';

// Posts to /export and triggers a browser download of the returned file.
export const exportDocument = async ({ type, source, sourceId, options }) => {
  const response = await apiClient.post(
    '/export',
    { type, source, sourceId, options },
    { responseType: 'blob' }
  );

  // Extract filename from Content-Disposition header, or use fallback
  const contentDisposition = response.headers['content-disposition'];
  const match = contentDisposition?.match(/filename="?(.+?)"?$/);
  const fileName = match?.[1] || `${source}-export.${type}`;

  // Trigger browser download
  const url = URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};
