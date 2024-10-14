import { Link } from 'react-router-dom';
const Index = () => {
  return (
    <div>
      <div>Hello World</div>
      <ul>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li>
          <Link to="/calculator">Calculator</Link>
        </li>
      </ul>
    </div>
  )
}

export default Index;
