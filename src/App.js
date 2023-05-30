import './App.css';
import Navbar from './Navbar';
import Body from './Body';
import Wishlist from './Wishlist';
import Cart from './Cart';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Wishlist />
      <Body />
      <Cart />
    </div>
  );
}

export default App;