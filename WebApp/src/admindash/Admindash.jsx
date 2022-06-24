import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import "./admindash.scss"
import List from "../components/adminlist/Adminlist"


export default function Admindash() {

    const [action, setAction] = useState([])
    const [drama, setDrama] = useState([])
    const [adventure, setAdventure] = useState([])
    const [comedy, setComedy] = useState([])
    const [sports, setSports] = useState([])
    const [movies, setMovies] = useState([])
    const [featured, setFeatured] = useState([])

    async function getFeatured() 
    {
      async function fetchFeatured() 
      {
          try {
              const response = await fetch(`http://localhost:1337/api/featured`, {
                method: 'GET',
                
              });
              const mylist = await response.json();
              // console.log(mylist)
              return mylist;
          } 
          catch (error) {console.error(error);}
      }
  
        const featuredList = await fetchFeatured("Comedy");
        setFeatured(featuredList);
    }
    
    useEffect(() => {
        document.title = "Admin-Fox"

        // Query and store genres
        async function getLists() 
        {
            async function fetchList(list) 
            {
            // setGenre(list)
            const genre = list
                try {
                    const response = await fetch(`http://localhost:1337/api/animeGenres`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        genre,
                    }),
                    });
                    const mylist = await response.json();
                    // console.log(mylist)
                    return mylist;
                } 
                catch (error) {console.error(error);}
            }
            
            const actionList = await fetchList("Action");
            setAction(actionList);
    
            const sportsList = await fetchList("Sports");
            setSports(sportsList)
    
            const dramaList = await fetchList("Drama");
            setDrama(dramaList);
    
            const comedyList = await fetchList("Comedy");
            setComedy(comedyList);
    
            const adventureList = await fetchList("Adventure");
            setAdventure(adventureList);
    
            const moviesList = await fetchList("Avant Garde");
            setMovies(moviesList);
    
            return actionList; 
        }
    
        getLists()
        getFeatured()
        // eslint-disable-next-line
    }, [])

    try {
        return (
            <div className='admin'>
                <br></br>
                <br></br>
                <div className='change-featured'>
                    <div className='action-br'>
                        <div className='child'>
                            <img src={featured[0].images} alt="" />
                        </div>
                        <div className='child2'>
                            <List title="Action" data={action} isInAnime={false}/>
                        </div>
                        
                    </div>
    
                    <List title="Drama" data={drama} isInAnime={false}/>
                    <List title="Adventure" data={adventure} isInAnime={false}/>
                    <List title="Comedy" data={comedy} isInAnime={false}/>
                    <List title="Sports" data={sports} isInAnime={false}/>
                    <List title="Movies" data={movies} isInAnime={false}/>
                </div>
    
            </div>
      )
    } catch (error) {
        <div>meh</div>   
    }

}
