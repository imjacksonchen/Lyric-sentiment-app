import React from 'react';
import axios from 'axios';

import { Card } from 'antd';

class SongDetailView extends React.Component {
    state = {
        song: {}
    }

    componentDidMount() {
        const songID = this.props.match.params.songID;
        axios.get(`https://lyrics-sentiment.herokuapp.com/api/song/${songID}`)
            .then(res => {
                this.setState({
                    song: res.data
                });
            })
    }

    render() {
        return (
            <div style={{ whiteSpace: "pre-line" }}>
                <Card title={this.state.song.title}>
                    <p>Lyrics:</p>
                    <p>{this.state.song.lyrics}</p>
                    <p>Sentiment Value: {this.state.song.sentimentVal}</p>
                    <p>Sentiment: {this.state.song.sentiment}</p>
                </Card>
            </div>
        )
    }
}

export default SongDetailView;