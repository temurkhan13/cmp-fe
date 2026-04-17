import apiClient from '@api/axios';

/**
 * Unified export function — calls the server-side export API
 * and triggers a browser download.
 *
 * @param {Object} params
 * @param {'pdf'|'docx'|'xlsx'|'pptx'} params.type - Export format
 * @param {'assessment'|'playbook'} params.source - Data source
 * @param {string} params.sourceId - UUID of the source record
 * @param {Object} [params.options] - Optional overrides (title, branding)
 */
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
