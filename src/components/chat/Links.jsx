import LinksICon from '../../assets/chat/LinksICon.png';

const documents = [
  {
    name: 'www.figma.com',
    link: 'https://www.figma.com/design/NFE9opL7eqFH8JBzEdo5So/Change-AI---CMS?node-id=2-4&t=6cfaQPsjeKCtr3L7-11',
  },
  {
    name: 'www.figma.com',
    link: 'https://www.figma.com/design/NFE9opL7eqFH8JBzEdo5So/Change-AI---CMS?node-id=2-4&t=6cfaQPsjeKCtr3L7-11',
  },
  {
    name: 'www.figma.com',
    link: 'https://www.figma.com/design/NFE9opL7eqFH8JBzEdo5So/Change-AI---CMS?node-id=2-4&t=6cfaQPsjeKCtr3L7-11',
  },
  {
    name: 'www.figma.com',
    link: 'https://www.figma.com/design/NFE9opL7eqFH8JBzEdo5So/Change-AI---CMS?node-id=2-4&t=6cfaQPsjeKCtr3L7-11',
  },
  {
    name: 'www.figma.com',
    link: 'https://www.figma.com/design/NFE9opL7eqFH8JBzEdo5So/Change-AI---CMS?node-id=2-4&t=6cfaQPsjeKCtr3L7-11',
  },
  {
    name: 'www.figma.com',
    link: 'https://www.figma.com/design/NFE9opL7eqFH8JBzEdo5So/Change-AI---CMS?node-id=2-4&t=6cfaQPsjeKCtr3L7-11',
  },
  {
    name: 'www.figma.com',
    link: 'https://www.figma.com/design/NFE9opL7eqFH8JBzEdo5So/Change-AI---CMS?node-id=2-4&t=6cfaQPsjeKCtr3L7-11',
  },
  {
    name: 'www.figma.com',
    link: 'https://www.figma.com/design/NFE9opL7eqFH8JBzEdo5So/Change-AI---CMS?node-id=2-4&t=6cfaQPsjeKCtr3L7-11',
  },
  {
    name: 'www.figma.com',
    link: 'https://www.figma.com/design/NFE9opL7eqFH8JBzEdo5So/Change-AI---CMS?node-id=2-4&t=6cfaQPsjeKCtr3L7-11',
  },
];

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const Links = () => {
  return (
    <div className="links-container">
      {documents.map((doc, index) => (
        <div key={index} className="link-item">
          <img src={LinksICon} alt="#" className="link-icon" />
          <div className="link-details">
            <div className="link-name">{doc.name}</div>
            <div className="link-url">{truncateText(doc.link, 45)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Links;
