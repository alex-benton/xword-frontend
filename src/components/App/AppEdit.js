/**
 *
 * @author alex
 */

import React from 'react';
import EditableCrosswordController from './../Crossword/EditableCrosswordController.js';
import Game from './../../objects/game.js';
import Metadata from './../../objects/metadata.js';
import AppLoading from './AppLoading.js';
import AppHeader from './AppHeader.js';
import {API_URL} from './../../util/constants.js';

class AppEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initializeState(props.params);
    }

    initializeState(params) {
        if (params != null && params.id != null) {
            this.loadEditGame(params.id);
            return {
                isLoading: true,
                isCreating: false,
                game: null,
                params: null
            };
        } else {
            logger.error("invalid params passed to appedit");
        }
    }

    startCreate(params) {
        this.setState({
            isLoading: false,
            isCreating: false,
            game: new Game(params.width, params.height),
            params: {
                metadata: new Metadata()
            }
        });
    }

    // todo: error handling
    async loadEditGame(id) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var url = API_URL + 'puzzle/edit/' + id;

        let ajax = {
            method: 'GET',
            headers: headers
        };

        let response = await fetch(url, ajax);
        let data = await response.json();

        this.setState({
            game: Game.fromSavedPuzzle(data.board, data.clues),
            isLoading: false,
            params: {
                id: data.id,
                editId: data.editId,
                metadata: Metadata.fromSavedMetadata(data.metadata)
            }
        });
    }

    render() {
        if (this.state.isLoading){
            return (<div><AppLoading /></div>);
        } else {
            return (
                <div>
                    <AppHeader />
                    <div className="app-body"><EditableCrosswordController game={this.state.game} params={this.state.params}/></div>
                </div>);
        }
    }
}

module.exports = AppEdit;