import { Input, Spin, Alert } from 'antd';
import React from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

const { Search } = Input;

class SearchBar extends React.Component {
    state = {
        artists: [],
        loading: false,
        error: false
    }

    onSearch(value) {
        this.setState({ loading: true }, () => {
            axios.post("https://lyrics-sentiment.herokuapp.com/api/", {
                name: value
            })
                .then(res => {
                    this.setState({
                        artists: [res.data],
                        loading: false
                    });
                })
                .catch(error => {
                    if (error.response.status === 500) {
                        console.log("Can't find artist; Is the name correct?")
                    }
                    if (error.response.status === 503){
                        this.setState({
                            loading: false,
                            error: true
                        })
                        console.log("artist took too long. Please serach a different artist.")
                    }
                })
        });
    };

    render() {
        return (
            <div>
                <Search
                    placeholder="Search for an Artist"
                    onSearch={(value) => this.onSearch(value)}
                    enterButton
                />
                {this.state.error === true &&  <Alert
                    description="Unable to search for artist. Process took too long, please search for another artist"
                    type="error"
                    closable/>
                }
                {this.state.loading ?
                    <Spin tip="Loading..." ><Alert message= " " description= " " type = "info" /> </Spin> : this.state.artists.length > 0 &&
                    <Redirect push to={`/${this.state.artists[0].id}`} />
                }
            </div>
        )
    }

}

export default SearchBar;