import { useEffect, useState } from "react";
import Candidate from "../interfaces/Candidate.interface";
import './SavedCandidates.css';

const SavedCandidates = () => {
  
  const [candidatesArray, setCandidatesArray] = useState<Candidate[]>([]); // set initial state to empty array

// get data from local storage on load

  useEffect(() => {
    const localArray = localStorage.getItem('candidatesArray');
    if (localArray) {
      setCandidatesArray(JSON.parse(localArray));
    }
  }, []);

  // remove candidate from array and local storage

  const handleRejectButton = (e: React.MouseEvent<HTMLButtonElement> ) => {
    const target = e.target as HTMLButtonElement;
    // console.log(target);
    const tr = target.closest('tr') as HTMLTableRowElement;
    // console.log(tr);
    const id = tr.querySelector('.tableID')?.textContent;
    // console.log(id);
    const newArray = candidatesArray.filter((candidate) => candidate.id != id);
    // console.log(newArray)
    setCandidatesArray(newArray);
    localStorage.setItem('candidatesArray', JSON.stringify(newArray));
    // console.log(localStorage.getItem('candidatesArray'));

  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <div id="tableDiv">
        <table>
          <tr>
            <th className="thID">ID</th>
            <th className="thImage">Image</th>
            <th className="thName">Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
          {candidatesArray.length > 0 ? candidatesArray.map((candidate: Candidate) => { // map through the array of candidates and create a table row for each
            return (
              <tr className="candidatesTR" key={candidate.id}>
                <td className="tableID">{candidate.id}</td>
                <td className="tableImage"> <img src={candidate.avatar_url} alt={candidate.login}></img></td>
                <td className="tableName">{candidate.name} ({candidate.login})</td>
                <td className="tableLocation">{candidate.location}</td>
                <td className="tableEmail">{candidate.email}</td>
                <td className="tableCompany">{candidate.company}</td>
                <td className="tableBio">{candidate.bio}</td>
                <td className="tableButton"><button id='rejectButton' onClick={handleRejectButton}>Reject</button></td>
              </tr>
            );
          }) : <tr><td colSpan={8}>No candidates have been accepted</td></tr>}
        </table>
      </div>
    </>
  );
};

export default SavedCandidates;
