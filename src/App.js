import './App.css';
import { useState } from 'react';

function App() {
  const [request, setFilmTitle] = useState("");
  const [type, setType] = useState("");
  const [erorrMessage, setErorrMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [value, setValue] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  let handlePositivityBias = async (e) => {
    const source = process.env.REACT_APP_BACK_END_SOURCE + `/wikipedia/wikipositivity/${request}`
    try {
      e.preventDefault();
      let res = await fetch(source)
      let resJSON = await res.json();
      if (res.status === 200) {
        setType("Postivity Bias")
        setSummary(resJSON.Summary);
        setValue(resJSON.PositivityValue);
        setShowButtons(false)
      }
      else if (res.status === 400) {
        setErorrMessage(resJSON.err);
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  let handleFictionalDetection = async (e) => {
    const source = process.env.REACT_APP_BACK_END_SOURCE + `/wikipedia/wikitense/${request}`
    try {
      e.preventDefault();
      let res = await fetch(source)
      let resJSON = await res.json();
      if (res.status === 200) {
        setType("Fictional Detection")
        setSummary(resJSON.Summary);
        console.log(resJSON)
        setValue(resJSON.classfication)
        setShowButtons(true)
      }
      else if (res.status === 400) {
        setErorrMessage(resJSON.err);
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  let returnClassifer = async (e, fictional) => {
    const source = process.env.REACT_APP_BACK_END_SOURCE + `/wikipedia/classifier/newEntry/${summary}/value/${fictional}`
    try {
      e.preventDefault(); 
      let res = await fetch(source)
      let resJSON = await res.json();
      console.log(resJSON);
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="App">
      <div className="container overflow-hidden text-center">
        <div className="row">
          <div className="col p-3">
            <form >
              <h2>WikiTruth</h2>
              <div className="input-group g-col-4 g-3">
                <span className="input-group-text">Name</span>
                <input className="form-control" type="text" value={request} id="message" name="message" onChange={(e) => setFilmTitle(e.target.value)}></input>
                <button type="submit" className="g-col-4 btn btn-primary" value="Submit" onClick={handlePositivityBias}>Postivity</button>
                <button type="submit" className="g-col-4 btn btn-primary" value="Submit" onClick={handleFictionalDetection}>Fictional</button>
              </div>
            </form>
            <div className="row">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Summary</th>
                    <th scope="col">{showButtons ? "Fictionality" : "Positivity"}</th>
                    <th scope="col">Fictional?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {type ? <th>{type}</th> : null}
                    {summary ? <th>{summary}</th> : null}
                    {value ? <th>{value}</th> : null}
                    {showButtons ? <th>
                      <button type="submit" className="btn btn-primary" value="Submit" onClick={(e) => returnClassifer(e, 0)}>Yes</button>
                      <button type="submit" className="btn btn-primary" value="Submit" onClick={(e) => returnClassifer(e, 1)}>No</button>

                    </th> : null}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="error">{erorrMessage ? <p>{erorrMessage}</p> : null}</div>

        </div >
        <footer className="bg-light text-center text-lg-start fixed-bottom">
          <div className="text-center p-3" >
            {process.env.NODE_ENV}
          </div>
        </footer>
      </div >
    </div>


  );
}

export default App;
