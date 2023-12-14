import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { LiaPlaySolid, LiaPauseSolid } from 'react-icons/lia';
import { LiaStepBackwardSolid, LiaStepForwardSolid } from 'react-icons/lia';

const Player = () => {
  const [showModal, setShowModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [songData, setSongData] = useState({
    songName: '',
    songLink: '',
    songSource: '',
    thumbnail: '',
  });
  const [songs, setSongs] = useState([
    {
      id: 1,
      name: 'Nobody Knows',
      source: 'YouTube',
      addedOn: new Date().toLocaleDateString('en-GB'),
      audioLink: 'https://youtu.be/q5C1x9QMrss?si=jXke_SsmFHEpsmYw',
    },
    {
      id: 2,
      name: 'Cold World',
      source: 'YouTube',
      addedOn: new Date().toLocaleDateString('en-GB'),
      audioLink: 'https://youtu.be/iWCB0eGqTck?si=PMXItuQf6YTZ8Xmq',
    },
    {
      id: 3,
      name: 'Sample',
      source: 'Sample',
      addedOn: new Date().toLocaleDateString('en-GB'),
      audioLink:
        'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
    },
    {
      id: 4,
      name: 'First Person Shooter',
      addedOn: new Date().toLocaleDateString('en-GB'),
      source: 'Spotify',
      audioLink:
        'https://open.spotify.com/track/7aqfrAY2p9BUSiupwk3svU?si=992cfb7503604b60',
    },
    {
      id: '5',
      name: 'Excuses Lofi',
      addedOn: new Date().toLocaleDateString('en-GB'),
      source: 'Soundcloud',
      audioLink:
        'https://soundcloud.com/iamgravero/excuses?si=d40091ca5289492eabe17760e9a8ab62&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    },
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const defaultThumbnail =
    'https://cdn-icons-png.flaticon.com/512/58/58281.png';

  const handlePlayPause = () => {
    if (!playing) {
      setSongData({
        songName: songs[0].name,
        songLink: songs[0].audioLink,
        songSource: songs[0].source,
        thumbnail: songs[0].thumbnail || defaultThumbnail,
      });
      setPlaying(!playing);
    } else {
      setPlaying(!playing);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSongData({
      ...songData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSongData({
      ...songData,
      thumbnail: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSong = {
      id: songs.length + 1,
      name: songData.songName,
      source: songData.songSource,
      addedOn: new Date().toISOString().slice(0, 10),
      audioLink: songData.songLink,
    };
    setSongs([...songs, newSong]);
    setSongData({
      songName: '',
      songLink: '',
      songSource: '',
      thumbnail: '',
    });
    setShowModal(false);
  };

  const handleDelete = (songId) => {
    const updatedSongs = songs.filter((song) => song.id !== songId);
    setSongs(updatedSongs);
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setSongData((prevSongData) => ({
      ...prevSongData,
      songName: songs[nextIndex].name,
      songLink: songs[nextIndex].audioLink,
      songSource: songs[nextIndex].source,
      thumbnail: songs[nextIndex].thumbnail || defaultThumbnail,
    }));
    setCurrentSongIndex(nextIndex);
    setPlaying(true);
  };

  const handlePrev = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setSongData((prevSongData) => ({
      ...prevSongData,
      songName: songs[prevIndex].name,
      songLink: songs[prevIndex].audioLink,
      songSource: songs[prevIndex].source,
      thumbnail: songs[prevIndex].thumbnail || defaultThumbnail,
    }));
    setCurrentSongIndex(prevIndex);
    setPlaying(true);
  };

  const handlePlayButtonClick = (song) => {
    setSongData({
      songName: song.name,
      songLink: song.audioLink,
      songSource: song.source,
      thumbnail: song.thumbnail || defaultThumbnail,
    });
    setPlaying(true);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="header"
      >
        <h2>Songs</h2>
        <button className="themeButton" onClick={() => setShowModal(true)}>
          Add Songs
        </button>
      </div>
      <hr />
      <table style={{ textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>SONG NAME</th>
            <th style={{ width: '18.33%' }}>SOURCE</th>
            <th style={{ width: '18.33%' }}>ADDED ON</th>
            <th style={{ width: '23.33%' }}></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={song.thumbnail || defaultThumbnail}
                  alt="Thumbnail"
                  style={{
                    width: '35px',
                    height: '35px',
                    marginRight: '10px',
                  }}
                />
                <span style={{ flex: 1 }}>{song.name}</span>
              </td>
              <td>{song.source}</td>
              <td>{song.addedOn}</td>
              <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  className="circleButtonplay"
                  onClick={() => handlePlayButtonClick(song)}
                >
                  <FaPlay />
                </button>
                <button
                  className="circleButton"
                  onClick={() => handleDelete(song.id)}
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '80%',
          backgroundColor: '#f0f0f0',
          borderTop: '1px solid #ddd',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex' }}>
            <img
              src={songData.thumbnail || defaultThumbnail}
              alt="Thumbnail"
              style={{
                width: '50px',
                height: '50px',
                marginRight: '10px',
              }}
            />
            <p>{songData.songName}</p>
          </div>
          <div className="controlsContainer">
            <button className="darkCircleButton" onClick={handlePrev}>
              <LiaStepBackwardSolid />
            </button>
            <button className="darkCircleButton" onClick={handlePlayPause}>
              {playing ? <LiaPauseSolid /> : <LiaPlaySolid />}
            </button>
            <button className="darkCircleButton" onClick={handleNext}>
              <LiaStepForwardSolid />
            </button>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <ReactPlayer
            url={songData.songLink}
            playing={playing}
            controls={true}
            width="100%"
            height="0px"
          />
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Add Songs</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="songName">Song Name:</label>
                <input
                  type="text"
                  id="songName"
                  name="songName"
                  value={songData.songName}
                  placeholder="Song Name"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="songLink">Song Link:</label>
                <input
                  type="text"
                  id="songLink"
                  name="songLink"
                  value={songData.songLink}
                  placeholder="URL"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="songSource">Song Source:</label>
                <input
                  type="text"
                  id="songSource"
                  name="songSource"
                  value={songData.songSource}
                  placeholder="Song Source"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="thumbnail"></label>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <span>
                  Image has to be of aspect ratio 1:1 with a size of 3000 pixels
                  x 3000 pixels
                </span>
              </div>
              <div className="addButtonContianer">
                <button type="submit">Cancel</button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
