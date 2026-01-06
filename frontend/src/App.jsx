import AppRouter from './router/AppRouter';
import { Toaster } from 'react-hot-toast';



const initialCartItems = [
  { id: 2, name: "Tacos Poulet Spécial", price: 35.00, quantity: 2, imageUrl: "..." },
  { id: 5, name: "Pizza 4 Fromages", price: 55.00, quantity: 1, imageUrl: "..." },
];


function App() {
   
 

    return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRouter />
    </>
  );
}

export default App;