import "../App.css";

const Footer = (props) => {
  return (
    <footer
      // class="
      //   d-flex p-3 w-100
      //   text-white
      //   justify-content-center
      //   align-items-center
      //   bottom-0
      //   "
      style={{ 
        backgroundColor: "#39B575", 
        position: props.pos, 
        width: "100%",
        padding: "1rem 2rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img src={require("../assets/e-Shop-s.png")} alt="logo" />
      <span style={{ marginLeft: 10 }}>
        © 2024 - Bruno Santos, Katherine Dorensky, Zeldrix Don
      </span>
    </footer>
  );
};

export default Footer;
