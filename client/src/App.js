import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import { sendEmailAPI } from './service/mailapi';
import { setEmail } from './service/mails';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [showButtons, setShowButtons] = useState('none');

  const fileInputRef = useRef();


  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
        setShowButtons('block'); 
      }
    }
    getImage();
  }, [file])


  const onUploadClick = () => {
    fileInputRef.current.click();   
  }

  const handleCopy = async () => {
       try{
        await navigator.clipboard.writeText(result);
        setCopied(true);
       }catch(error){
        console.error('Failed to copy link',error);
       }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendEmail = async () => {
    if (sending) return;
    setSending(true);
    

    try {
      await sendEmailAPI();
      console.log('Email sent successfully!');
    
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setSending(false);
    }
  };
  return (
    <div className='container'>
      {/* <img src={url} className='img' alt ="Background-image"/> */}
      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share the download link.</p>
        
        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target='_blank' rel="noreferrer" >{result}</a> 
        {/* <div className='sendbtn' > */}
        <button onClick= {handleCopy} style={{ display: showButtons }}>  {copied ? 'Link Copied!' : 'Copy Link'}</button>
        <p style={{ display: showButtons }}>OR</p>
        <input  id='typeEmail' type='email' placeholder='Enter your Email' onChange={handleEmailChange} style={{ display: showButtons }}/>
        <button className = "submit" onClick={handleSendEmail} style={{ display: showButtons }}>
        {sending ? 'Sent' : 'Send Email'} </button>
        </div>
      </div>
    // </div>
  );
}

export default App;
