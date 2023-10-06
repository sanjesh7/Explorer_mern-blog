import './App.css';
import Layout from './Layout';
import Index from './indexPage/Index';
import Login from './indexPage/Login';
import {  Routes, Route } from 'react-router-dom';
import RegisterPage from './indexPage/RegisterPage';
import Userprovider from './userContext';
import CreatePost from './indexPage/CreatePost';
import PostPage from './indexPage/PostPage';
import EditPost from './indexPage/EditPost';

function App() {
  return (
  <Userprovider>
    <Routes>
       <Route path="/" element={<Layout/>}>
        <Route index element={<Index/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/Register" element={<RegisterPage/>}/>
        <Route path="/create" element={<CreatePost/>}/>
        <Route path='/post/:id' element={<PostPage/>}/>
        <Route path='/edit/:id' element={<EditPost/>}/>
       </Route>  
    </Routes>
    </Userprovider>
  
  );
}

export default App;

