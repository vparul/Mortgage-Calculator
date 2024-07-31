import Calculator from './components/Calculator';
import Result from './components/Result';

function App() {
 return (
  <div className='bg-slate-100 h-screen w-screen'>
    <div className='flex h-full items-center justify-center'>
  <div className='flex bg-white m-12 rounded-3xl w-3/5'>
  <Calculator />
  <Result />
    </div>
    </div>

  </div>
 )
}

export default App;
