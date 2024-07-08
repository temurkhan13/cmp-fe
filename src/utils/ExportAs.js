import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';


export const downloadChatAsPDF = (chat) => {
  const doc = new jsPDF();
  doc.text(chat.title, 10, 10);
  doc.text(chat.content, 10, 20);
  doc.save(`${chat.title}.pdf`);
};

export const downloadFolderAsZip = async (folder) => {
  const zip = new JSZip();
  folder.chats.forEach(chat => {
    zip.file(`${chat.title}.txt`, chat.content);
  });
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${folder.name}.zip`);
};
