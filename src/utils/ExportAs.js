import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export const downloadFolderAsZip = async (folder) => {
  const zip = new JSZip();
  folder.chats.forEach(chat => {
    zip.file(`${chat.title}.txt`, chat.content);
  });
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${folder.name}.zip`);
};
