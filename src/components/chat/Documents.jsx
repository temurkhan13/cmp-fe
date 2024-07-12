import fileIcon from '../../assets/dashboard/fileIcon.png';

const documents = [
  { name: 'Document1.pdf', size: '235KB', date: 'April 18, 2024, 6:17 PM' },
  { name: 'Document2.docx', size: '120KB', date: 'April 19, 2024, 5:30 PM' },
  { name: 'Document3.txt', size: '50KB', date: 'April 20, 2024, 10:45 AM' },
  { name: 'Document1.pdf', size: '235KB', date: 'April 18, 2024, 6:17 PM' },
  { name: 'Document2.docx', size: '120KB', date: 'April 19, 2024, 5:30 PM' },
  { name: 'Document3.txt', size: '50KB', date: 'April 20, 2024, 10:45 AM' },
  { name: 'Document1.pdf', size: '235KB', date: 'April 18, 2024, 6:17 PM' },
  { name: 'Document2.docx', size: '120KB', date: 'April 19, 2024, 5:30 PM' },
];

const Documents = () => {
  return (
    <div className="documents">
      {documents.map((doc, index) => (
        <div key={index} className="document">
          <img src={fileIcon} alt="#" />
          <div className="document-info">
            <div className="document-name">{doc.name}</div>
            <div className="document-date">{doc.date}</div>
          </div>
          <div className="document-size">{doc.size}</div>
        </div>
      ))}
    </div>
  );
};

export default Documents;
