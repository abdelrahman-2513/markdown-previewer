import './App.css';
import React, { useState } from 'react';
import { marked } from 'marked'
import { basicSyntax } from './data';



const App = () => {
  const [code, setCode] = useState(localStorage.getItem('code') || '## Hello')
  const [compiled, setCompiled] = useState(localStorage.getItem('preview') || '<h2 id="hello">Hello</h2>')
  // const [docs, setDocs] = useState([])
  const [hide, hidePreview] = useState(true)
  const [hideDocs, setHideDocs] = useState(true)

  const openMD = () => {
    console.log(0)
    hidePreview(true)
    setHideDocs(true)
  }

  const openPreview = () => {
    console.log(0)
    hidePreview(false)
    setHideDocs(true)
  }
  const openDocs = async () => {

    console.log(0)
    hidePreview(true)
    setHideDocs(false)




    // try {
    //   const response = await fetch('/api/v1/basic-syntax.json');

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   console.log(response);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  }

  const handleChange = async (e) => {
    setCode(e.target.value)
    localStorage.setItem('code', e.target.value)
    localStorage.setItem('preview', marked.parse(e.target.value))
    setCompiled(marked.parse(e.target.value))
  }

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className={hide && hideDocs ? "btn" : ''}>MarkDown</button>
          <button onClick={openPreview} className={!hide && hideDocs ? "btn" : ''}>Preview</button>
          <button onClick={openDocs} className={hide && !hideDocs ? "btn" : ''}>Docs</button>
        </div>
        {
          hide && hideDocs ?
            <div>
              <textarea onChange={handleChange} value={code} />
            </div> : !hide && hideDocs ?
              <div>
                <textarea value={compiled} readOnly />
              </div> :
              <div className='docs'>
                <div className='docs-area'>{basicSyntax.map((syntax, i) => { return <Syntax syntax={syntax} key={i} /> })}</div>
              </div>
        }
      </div>
    </>
  )
}
function Syntax({ syntax }) {
  return (<div className='syntax'>
    <h2>{syntax.name}</h2>
    <p>{syntax.description}</p>
    {syntax.examples.map((example, i) => { return <Example ex={example} key={i} ><h3>Example {i + 1}:</h3></Example> })}
    {syntax.additional_examples.map((example, i) => {
      return <Example ex={example} key={i}>
        <h3>{example.name}:</h3>
        <p>{example.description}</p>
      </Example>
    })}
  </div>)
}
function Example({ ex, children }) {
  return (
    <div className='example'>
      {children}
      <h6>markdown</h6>
      <p>{ex.markdown}</p>
      <h6>html</h6>
      <p>{ex.html}</p>
    </div>
  )
}

export default App;
