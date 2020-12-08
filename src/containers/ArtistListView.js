import React from 'react';
import axios from 'axios';

import Artist from '../components/Artist';

class ArtistList extends React.Component {
    state = {
        artists: []
    }

    componentDidMount() {
        axios.get("https://lyrics-sentiment.herokuapp.com/api/")
            .then(res => {
                this.setState({
                    artists: res.data
                });
            })
    }

    render() {
        return (
            <Artist data={this.state.artists} />
        )
    }

}

export default ArtistList;