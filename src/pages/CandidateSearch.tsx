import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

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
      console.log(candidate)
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

const handleRightSwipe = () => {
const newCandidatesArray: Candidate[] = [...candidatesArray, candidate];
setCandidatesArray(newCandidatesArray);
localStorage.setItem('candidatesArray', JSON.stringify(newCandidatesArray));
handleLeftSwipe();
}

return (
<div>
  <h1>CandidateSearch</h1>
  <div>
    <img src={candidate.avatar_url} alt={candidate.login} />
    <h2>{candidate.login}</h2>
    <p>{candidate.bio}</p>
  </div>
  <button onClick={handleLeftSwipe}>-</button>
  <button onClick={handleRightSwipe}>+</button>
</div>
);
};

export default CandidateSearch;
