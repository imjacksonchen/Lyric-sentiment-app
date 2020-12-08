import React from 'react';
import axios from 'axios';

import Song from '../components/Song';

class SongDetail extends React.Component {
    state = {
        songs: [],
        album_name: ''
    }

    componentDidMount() {
        const albumID = this.props.match.params.albumID;
        axios.get(`https://lyrics-sentiment.herokuapp.com/api/song/?album=${albumID}`)
            .then(res => {
                this.setState({
                    songs: res.data
                });
            })
        axios.get(`https://lyrics-sentiment.herokuapp.com/api/album/${albumID}`)
            .then(res => {
                this.setState({
                    album_name: res.data
                });
            })
    }

    render() {
        return (
            <Song data={this.state.songs} album_name={this.state.album_name["name"]} />
        )
    }
}

export default SongDetail;