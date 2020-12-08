import React from 'react';
import axios from 'axios';

import Album from '../components/Album';

class ArtistDetail extends React.Component {
    state = {
        artist: [],
        artist_name: '',
        id: this.props.match.params.artistID
    }

    componentDidMount() {
        const artistID = this.props.match.params.artistID;
        axios.get(`https://lyrics-sentiment.herokuapp.com/api/album/?artist=${artistID}`)
            .then(res => {
                this.setState({
                    artist: res.data
                });
            })
        axios.get(`https://lyrics-sentiment.herokuapp.com/api/${artistID}`)
            .then(res => {
                this.setState({
                    artist_name: res.data
                });
            })
    }

    componentDidUpdate() {
        if (this.state.id !== this.props.match.params.artistID) {
            const artistID = this.props.match.params.artistID;
            axios.get(`https://lyrics-sentiment.herokuapp.com/api/album/?artist=${artistID}`)
                .then(res => {
                    this.setState({
                        artist: res.data,
                        id: this.props.match.params.artistID
                    });
                })
            axios.get(`https://lyrics-sentiment.herokuapp.com/api/${artistID}`)
                .then(res => {
                    this.setState({
                        artist_name: res.data
                    });
                })
        }
    }

    render() {
        return (
            <Album data={this.state.artist} artist_name={this.state.artist_name['name']} />
        )
    }
}

export default ArtistDetail;