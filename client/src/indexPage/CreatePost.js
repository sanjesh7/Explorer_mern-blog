import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../editor";

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const url="http://localhost:5000/post";
    const options={
        method: 'POST',
        body: data,
        credentials: 'include',
    }
    const response = await fetch(url,options);
    if (response.ok) {
      setRedirect(true);
    }
  }

  if(redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
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
      <button style={{marginTop:'8px'}}>Create post</button>
    </form>
  );
}