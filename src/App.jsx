import { useEffect, useState } from 'react';
import './App.css';
import { generatePermutation, validateOneToSixInput, validateSixToOneInput } from './fretUtils';

function App() {
  const [oneToSixPerm, setOneToSixPerm] = useState([]);
  const [sixToOnePerm, setSixToOnePerm] = useState([]);
  const [oneToSixStatuses, setOneToSixStatuses] = useState(new Array(12).fill("default"));
  const [sixToOneStatuses, setSixToOneStatuses] = useState(new Array(12).fill("default"));

  const generateTable = () => {
    setOneToSixPerm(generatePermutation());
    setSixToOnePerm(generatePermutation());
    setOneToSixStatuses(new Array(12).fill("default"));
    setSixToOneStatuses(new Array(12).fill("default"));
  }

  useEffect(() => {
    generateTable();
  }, []);

  const onValidate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const newOneToSixStatuses = [];
    const newSixToOneStatuses = [];
    for (let i = 0; i < 12; i++) {
      newOneToSixStatuses[i] = validateOneToSixInput(formData.get(`1to6-${i}`), oneToSixPerm[i]) ? "valid" : "invalid";
      newSixToOneStatuses[i] = validateSixToOneInput(formData.get(`6to1-${i}`), sixToOnePerm[i]) ? "valid" : "invalid";
    }

    setOneToSixStatuses(newOneToSixStatuses);
    setSixToOneStatuses(newSixToOneStatuses);
  }

  const onReroll = () => {
    generateTable();
  }

  return (
    <form method="post" onSubmit={onValidate}>
      <table>
        <thead>
          <tr>
            <th>Fret #</th>
            <th>1 to 6</th>
            <th>Fret #</th>
            <th>6 to 1</th>
          </tr>
        </thead>
        <tbody>
          {new Array(12).fill(0).map((_, i) => (
            <tr key={i}>
              <td className={oneToSixStatuses[i]}>{oneToSixPerm[i]}</td>
              <td>
                <input className={oneToSixStatuses[i]} type="text" name={`1to6-${i}`} autoComplete="off" />
              </td>
              <td className={sixToOneStatuses[i]}>{sixToOnePerm[i]}</td>
              <td>
                <input className={sixToOneStatuses[i]} type="text" name={`6to1-${i}`} autoComplete="off" />
              </td>
            </tr>  
          ))}
        </tbody>
      </table>
      <div className="actions">
        <button type="submit" className="validate-btn">Validate</button>
        <button type="reset" className="reroll-btn" onClick={onReroll}>Reroll the table</button>
      </div>
      <div className="help">
        <p>
          For each cell in a table - enter all the notes on the corresponding fret, 
          either from string 1 to 6, or from string to 1 (depending on the column). 
        </p>
        <p>
          You can use sharps or flats (but not double sharps/flats), upper or lowercase letters, 
          and " ", "," or "." as a separator. I.e. "E A D G B E", "e,a,d,g,b,e", "fb.a.d.g.cb.e" are all
          valid for fret 12, string 6 to 1.
        </p>
      </div>
    </form>
  )
}

export default App
