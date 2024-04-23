import './Home.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Home = () => {
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])
  const [token, setToken] = useState('')
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  console.log(token)
  const CLIENT_ID = '6c833cb30c814783b9d86f9718112063'
  const REDIRECT_URI = 'http://localhost:5173/'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'
  const searchArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })

    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
        {artist.name}
      </div>
    ))
  }

  return (
    <div>
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
        to Spotify</a>
      <br />
      <button onClick={logout}>Logout</button>
      {token ?
        <form onSubmit={searchArtists}>
          <input type="text" onChange={e => setSearchKey(e.target.value)} />
          <button type={"submit"}>Search</button>
        </form>

        : <h2>Please login</h2>
      }
      {renderArtists()}
    </div>
  )
}

export default Home
