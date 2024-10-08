import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import './CandidateSearch.css';

const CandidateSearch = () => {

  const [candidate, setCandidate] = useState<Candidate>({} as Candidate); // for the single candidate that will be displayed
  const [candidatesArray, setCandidatesArray] = useState<Candidate[]>([]); // for the array of candidates that will be displayed on the saved candidates page

// on load if there is no candidatesArray in localStorage, create one
useEffect(() => {
  const localArray = localStorage.getItem('candidatesArray');
  if (localArray) {
    setCandidatesArray(JSON.parse(localArray));
  }
}, []);

// search for a random user on load

useEffect(() => {
  searchGithub().then((data) => {
    // console.log(data)
    searchGithubUser(data[0].login).then((user) => {
      // console.log(user)
      setCandidate(user);
      console.log(user)
    });
  });
}, []);

// function for left swipe; search again

const handleLeftSwipe = () => {
  searchGithub().then((data) => {
    searchGithubUser(data[0].login).then((data) => {
      setCandidate(data);
    });
  });
}
// function for right swipe; save candidate to candidatesArray; search again
// if candidate is undefined, do not save to candidatesArray; temporary fix for displaying empty candidates when searched.

const handleRightSwipe = () => {
  if(candidate.login !== undefined || null) {
    const newCandidatesArray: Candidate[] = [...candidatesArray, candidate];
    setCandidatesArray(newCandidatesArray);
    localStorage.setItem('candidatesArray', JSON.stringify(newCandidatesArray));
    handleLeftSwipe();
  }
    handleLeftSwipe();
}

return (
  <div>
    <h1>CandidateSearch</h1>
    <div id='candidateCard'>
      <div>
      <img src={candidate.avatar_url} alt={candidate.login} />
      </div>
      <div id='candidateInfo'>
        <h2>{candidate.name} ({candidate.login})</h2>
        <p>{candidate.email ? 'Email: ' + candidate.email : null}</p>
        <p>GitHub: <a href={candidate.html_url} target='_blank'>{candidate.html_url}</a></p>
        <p>{candidate.location ? 'Location: ' + candidate.location : null}</p>
        <p>{candidate.company ? 'Company: ' + candidate.company : null}</p>
      </div>
    </div>
    <div id='buttonDiv'>
      <button id='leftButton' onClick={handleLeftSwipe}>-</button>
      <button id='rightButton' onClick={handleRightSwipe}>+</button>
    </div>
  </div>
);
};

export default CandidateSearch;
