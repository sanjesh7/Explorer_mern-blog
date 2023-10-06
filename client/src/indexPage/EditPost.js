import {useEffect, useState} from "react";
import { Navigate } from "react-router-dom";
import Editor from "../editor";
import { useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState('');
    
  useEffect(()=>{
    const url='http://localhost:5000/post/'+id;
     fetch(url).then((response)=>{
        response.json().then((data)=>{
          setTitle(data.title);
          setSummary(data.summary);
          setContent(data.content)
        })
     })
  },[])


  const updatePost=async(e)=>{
   e.preventDefault();
   const data = new FormData();
   data.set('title', title);
   data.set('summary', summary);
   data.set('content', content);
   data.set('id',id);
   if (files?.[0]) {
    data.set('file', files?.[0]);
  }

   const url="http://localhost:5000/post";
   const options={
    method: 'PUT',
      body: data,
      credentials: 'include',
   };
 const response= await fetch(url,options);
  if (response.ok) {
    setRedirect(true);
  }
}


if(redirect) {
    return <Navigate to={'/post/'+id} />
  }
  return (
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} required/>
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} required/>
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} accept=".jpg,.jpeg,.png"/>
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'8px'}}>Update post</button>
    </form>
  );
}