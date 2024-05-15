import { Link } from "react-router-dom";

const Links = () => {
  const links = [
    { title: "Home", path: "/" },
    { title: "Transaction Management", path: "/transaction" },
    { title: "Budget Management", path: "/budget" },
    { title: "Profile", path: "/profile" },
  ];

  return (
    <div className='flex items-center gap-8 h-full px-4 rounded-full'>
      {links.map((link, index) => (
        <Link to={link.path} key={index}>
          {link.title}
        </Link>
      ))}
    </div>
  );
};
export default Links;
