import React, {useState , useEffect} from 'react';
import {Form ,Card ,Image ,Icon, CardContent} from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [name ,setName] = useState('');
  const [userName ,setUsername] = useState('');
  const [followers ,setFollowers] = useState('');
  const [repos ,setRepos] = useState('');
  const [following ,setFollowing ] = useState('');
  const [avatar , setAvatar] = useState('');
  const [userInput , setUserInput ] = useState('');
  const [error,setError] = useState('');
  const [dispRepos , setDispRepos] = useState('');
  const [repName = [], setRepName] = useState('')
  const repositories =[]
   
  const setData = ({name,login,followers,following,public_repos,avatar_url,repos_url})=>{
    setName(name)
    setUsername(login)
    setFollowers(followers)
    setFollowing(following)
    setRepos(public_repos)
    setAvatar(avatar_url)
    setDispRepos(repos_url)
  }


 const handleSearch = e => {
   setUserInput(e.target.value)
 }
 
 

 const handleSubmit = () =>{
  fetch(`https://api.github.com/users/${userInput}`)
  .then(res =>res.json())
  .then(data => {
    if(data.message){
      setError(data.message)
    }
    else{
    setData(data)
    setError(null)
    fetch(dispRepos)
    .then(res =>res.json())
    .then(repData => {
     setRepName(repData)
     console.log(repName)     
    })
    }

  })
 }
  return (
    <div >
      <div className ='navbar'>Github search</div>
      <div className ='search'> 
      <Form onSubmit ={handleSubmit}> 
        <Form.Group >
            <Form.Input placeholder ='Github User' name = 'github user' onChange={handleSearch}/>
            <Form.Button content ='search'/>
          </Form.Group>
        </Form> 
        </div>
        
        {error ? (<h1>{error}</h1>):( <div className ='card'>
          <Card>
            <Image
             src ={avatar}
             wrapped
             ui ={false}
            />
            <Card.Content>
                 <Card.Header>{name}</Card.Header>
                 <Card.Header>{userName}</Card.Header>
            
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name ='user'/>
               {followers}Followers
                </a>
              </Card.Content>
              <Card.Content extra>
              <a>
                <Icon name ='user'/>
                {following}Following
                </a>
              </Card.Content>
              <Card.Content extra>
              <a>
                <Icon name ='user'/>
                {repos} Repos
                </a>
              </Card.Content>
           </Card>     
        </div>) }
        
        <div className ='Repos'>
        <Card.Content>
                 <Card.Header>Repos</Card.Header>
                 
            </Card.Content>
            <Card.Content extra>
              <a>
               <Icon name ='user'/>
               Repos {repName}
                 </a>
              </Card.Content>
        </div>
    </div>
  );
}

export default App;
