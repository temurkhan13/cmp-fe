import SidebarLogo from "../../assets/dashboard/sidebarLogo.png";
import { Link } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";

const Sidebar = () => {
  const Menu = [
    "Dashboard",
    "AI Assistant",
    "Digital Palybook",
    "My Assistant",
    "Plan & Billing",
    "Help Center",
    "Feedback",
    "Trash",
  ];

  return (
    <section className="section">
      <div className="Sidebar_logo">
        <div className="image">
          <img
            src={SidebarLogo}
            alt="logo"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="heading">
          <p
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "white",
            }}
          >
            ChangeAI
          </p>
          <p
            style={{
              color: "gray",
            }}
          >
            By InnovationsWorks
          </p>
        </div>
      </div>
      {Menu.map((item, index) => (
        <Link
          key={index}
          to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
          style={{
            display: "flex",
            justifyContent: "left",
            textAlign: "center",
            alignItems: "center",
            // backgroundColor: "lightgray",
            padding: "15px 20px",
            fontSize: "18px",
            fontFamily: "Poppins",
            color: "gray",
            textDecoration: "none",
          }}
        >
          <CgMenuGridR
            style={{
              fontSize: "24px",
              color: "gray",
              marginRight: "10px",
            }}
          />
          <span>{item}</span>
        </Link>
      ))}
    </section>
  );
};

export default Sidebar;
