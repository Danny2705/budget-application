import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/authSlice";
import toast from "react-hot-toast";

const Links = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const links = [
    { title: "Home", path: "/" },
    { title: "Transaction Management", path: "/transaction" },
    { title: "Budget Management", path: "/budget" },
    { title: "Profile", path: "/profile" },
  ];

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("User logged out successfully");
    navigate("/login");
  };
  return (
    <div>
      {links.map((link, index) => (
        <Link href={link.path} key={index}>
          {link.title}
        </Link>
      ))}
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};
export default Links;
