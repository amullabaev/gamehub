import { NavLink } from 'react-router';

const Navigation = () => {
  return (
    <div className="bg-gray-300 p-4 w-40 h-screen flex flex-col gap-4 ">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/games/flags">Flags</NavLink>
      <NavLink to="/games/clicker">Clicker</NavLink>
    </div>
  );
};

export default Navigation;
