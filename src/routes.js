import React from 'react';
import { Route } from 'react-router-dom';

import ArtistList from './containers/ArtistListView';
import ArtistDetail from './containers/ArtistDetailView';
import SongDetail from './containers/SongView';
import SongDetailView from './containers/SongDetailView';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={ArtistList} />
        <Route exact path='/:artistID' component={ArtistDetail} />
        <Route exact path='/artist/:albumID' component={SongDetail} />
        <Route exact path='/album/:songID' component={SongDetailView} />
    </div>
);

export default BaseRouter;