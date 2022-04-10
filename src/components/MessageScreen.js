import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'

function MessageScreen({ setMessageScreen, postMessage, setPostMessage }) {
    const inputRef = useRef(null)
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('#FFFFFF')
    const [font, setFont] = useState('#000000')
    const [gifsScreen, setGifsScreen] = useState(false)
    const [search, setSearch] = useState('')
    const [giphy, setGiphy] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [selectGiphy, setSelectGiphy] = useState([])
    const [messageGiphy, setMessageGiphy] = useState(false)
    const [isGiphy, setIsGiphy] = useState(false)

    const White = () => {
        setColor('#FFFFFF')
        setFont('#000000')
        inputRef.current.style.background = '#FFFFFF'
        inputRef.current.style.color = '#000000'
    }

    const Grey = () => {
        setColor('#999999')
        setFont('#FFFFFF')
        inputRef.current.style.background = '#999999'
        inputRef.current.style.color = '#FFFFFF'
    }

    const Red = () => {
        setColor('#C70039')
        setFont('#FFFFFF')
        inputRef.current.style.background = '#C70039'
        inputRef.current.style.color = '#FFFFFF'
    }

    const Blue = () => {
        setColor('#4267B2')
        setFont('#FFFFFF')
        inputRef.current.style.background = '#4267B2'
        inputRef.current.style.color = '#FFFFFF'
    }

    const Search = async (e) => {
        e.preventDefault()
        setSearch(e.target.value)
        setError(false)
        setLoading(true)
        try {
            const response = await axios('https://api.giphy.com/v1/gifs/search', { params: { api_key: '', q: search } })
            setGiphy(response.data.data)
            setLoading(false)
        }
        catch (error) {
            setError(true)
            console.log(error)
        }
    }

    const SelectGiphy = async (id) => {
        let gif_id = id
        setIsGiphy(true)
        const response = await axios(`https://api.giphy.com/v1/gifs/${gif_id}`, { params: { api_key: '' } })
        setSelectGiphy(response.data.data)
        setMessageGiphy(true)
    }

    const Post = (e) => {
        e.preventDefault()
        setPostMessage([...postMessage, { id: Math.random(), message: message, color: color, font: font, selectGiphy: selectGiphy, isGiphy: isGiphy }])
        console.log(postMessage)
        setMessageScreen(false)
    }

    useEffect(() => {
        async function GetGiphy() {
            setError(false)
            setLoading(true)
            try {
                const response = await axios('https://api.giphy.com/v1/gifs/trending', { params: { api_key: '', limit: 5 } })
                console.log(response)
                setGiphy(response.data.data)
                setLoading(false)
            }
            catch (error) {
                setError(true)
                console.log(error)
            }
        }
        GetGiphy()
    }, [])

    return (
        <div>
            <div className='row'>
                <div className='col-sm'></div>
                <div className='col'>
                    <div className='container-sm' style={{ border: '#C0C0C0 solid 1px', padding: '10px' }}>
                        <br />
                        <p>
                            <button className='btn btn-light btn-sm' style={{ background: '#4267B2', color: 'white' }}>Compose Post</button>&nbsp;
                            <button className='btn btn-light btn-sm'>Photo/Video Album</button>&nbsp;
                            <button className='btn btn-light btn-sm'>Live Video</button>&nbsp;
                            <button className='btn btn-light btn-sm' style={{ background: '#4267B2', color: 'white' }} onClick={() => setMessageScreen(false)}>X</button>
                        </p>
                        <div className='mb-3'>
                            <textarea className='form-control' rows='2' type='text' placeholder='Write something here...' value={message} ref={inputRef} onChange={(e) => setMessage(e.target.value)} />
                        </div>
                        {
                            messageGiphy ?
                                <img src={selectGiphy.images.fixed_height.url} />
                                :
                                null
                        }
                        <br />
                        <br />
                        <p>
                            <button className='btn btn-light btn-sm' style={{ border: '#C0C0C0 solid 1px' }} onClick={White}>&nbsp;&nbsp;&nbsp;</button>&nbsp;
                            <button className='btn btn-secondary btn-sm' onClick={Grey}>&nbsp;&nbsp;&nbsp;</button>&nbsp;
                            <button className='btn btn-danger btn-sm' onClick={Red}>&nbsp;&nbsp;&nbsp;</button>&nbsp;
                            <button className='btn btn-light btn-sm' style={{ background: '#4267B2', color: 'white' }} onClick={Blue}>&nbsp;&nbsp;&nbsp;</button>
                        </p>
                        <p>
                            <button className='btn btn-light btn-sm'>Tag friends</button>&nbsp;&nbsp;
                            <button className='btn btn-light btn-sm'>Check in</button>&nbsp;&nbsp;
                            <button className='btn btn-primary btn-sm' style={{ background: '#4267B2', color: 'white' }} onClick={() => setGifsScreen(!gifsScreen)}>GIF</button>&nbsp;&nbsp;
                            <button className='btn btn-light btn-sm'>Tag Event</button>&nbsp;&nbsp;
                        </p>
                        <p className='text-right'>
                            <button className='btn btn-light btn-sm'>Only me</button>
                            <button className='btn btn-primary btn-sm' style={{ background: '#4267B2', color: 'white' }} onClick={Post}>Post</button>
                        </p>
                        {gifsScreen ? <div>
                            <div className='mb-3'>
                                <input type='text' className='form-control' placeholder='Search gifs...' value={search} onChange={Search} />
                            </div>
                            {
                                loading ? <p>Loading</p> : error ? <p>Error</p> :
                                    <div>
                                        {
                                            giphy.map(Data => {
                                                return (
                                                    <div key={Data.id}>
                                                        <img src={Data.images.fixed_height.url} onClick={() => SelectGiphy(Data.id)} />
                                                        <br />
                                                        <br />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                            }
                        </div> : null}
                    </div>
                </div>
                <div className='col-sm'></div>
            </div>
        </div>
    )
}

export default MessageScreen
