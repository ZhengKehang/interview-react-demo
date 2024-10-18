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
        <li>
          <Link to="/time">Time</Link>
        </li>
        <li>
          <Link to="/file">File</Link>
        </li>
        <li>
          <Link to="/user">User manage</Link>
        </li>
      </ul>
    </div>
  )
}

export default Index;
