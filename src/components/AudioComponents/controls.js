import React, { useState, useEffect, useRef, useContext } from 'react'
function Controls({post}) {
  // Global State
  const [playing,setPlaying]=useState('')
  const [repeat,setRepeat]=useState()
  const [toggleRepeat,setToggleRepeat]=useState()
  const { title, thumbnail, likes, speaker, file} = post;
  const baseurl = 'http://localhost:8000';
  const production_url = 'https://hearlitpodcast.onrender.com';
  function handleEnd(){
    console.log("end");
  }
  function togglePlaying(){
    console.log("togglePlaying()");
    if(playing==''){
        setPlaying('hide');
    }
    else{
        setPlaying('');
    }
  }
  const audio = useRef('audio_tag')

  // self State
  const [statevolum, setStateVolum] = useState(0.3)
  const [dur, setDur] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s
  }

  const toggleAudio = () =>
    audio.current.paused ? audio.current.play() : audio.current.pause()

  const handleVolume = (q) => {
    setStateVolum(q)
    audio.current.volume = q
  }

  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100
    setCurrentTime(compute)
    audio.current.currentTime = compute
  }

  useEffect(() => {
    audio.current.volume = statevolum
    if (playing) {
      toggleAudio()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  return (
    <div className="controls">
      <audio
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onCanPlay={(e) => setDur(e.target.duration)}
        onEnded={handleEnd}
        ref={audio}
        type="audio/mpeg"
        preload="true"
        src={`${production_url}${file}`}
      />
      <div className="vlme">
        <span className="volum">
          <i className="fas fa-volume-down"></i>
        </span>
        <input
          value={Math.round(statevolum * 100)}
          type="range"
          name="volBar"
          id="volBar"
          onChange={(e) => handleVolume(e.target.value / 100)}
        />
      </div>
      <div className="musicControls">

        <span
          className="play"
          onClick={() => {
            togglePlaying()
            toggleAudio()
          }}
        >
          <span className={!playing ? '' : 'hide'}>
            <i className="fas fa-play"></i>
          </span>
          <span className={!playing ? 'hide' : ''}>
            <i className="fas fa-pause"></i>
          </span>
        </span>
      </div>

      <div className="progressb">
        <div className="songMeta">
          <span className="songtitle">{title}</span>
          <span className="songartistName">
            {speaker}
          </span>
        </div>
        <input
          onChange={handleProgress}
          value={dur ? (currentTime * 100) / dur : 0}
          type="range"
          name="progresBar"
          id="prgbar"
        />
        <span className="currentT">{fmtMSS(currentTime)}</span>/
        <span className="totalT">{fmtMSS(dur)}</span>
      </div>
      <div className="plsoptions">
      </div>
    </div>
  )
}

export default Controls