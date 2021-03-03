import { IoAirplane } from 'react-icons/io5';
import './styles.css';

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation__title">
        <IoAirplane size={30} />
        <h1 className="navigation__name">Aircraft Scheduling</h1>
      </div>
    </nav>
  );
}
