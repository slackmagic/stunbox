import React from 'react';
import { Step, Icon } from 'semantic-ui-react';
import Itemstore from "../../../utils/helix/helixItemstore";
import Userstore from "../../../utils/helix/helixUserstore";
import Formatter from "../../../utils/helix/helixFormatter";

import "react-table/react-table.css";
import "../../../css/background.css";

class GrimoireItemSteps extends React.Component {

    state = {
        isLoading: true
    }

    componentDidMount() {

    }

    render() {

        return (
            <div>

                <Step.Group attached='top' size='small'>
                    <Step active>
                        <Icon name='search' />
                        <Step.Content>
                            <Step.Title>Référence</Step.Title>
                            <Step.Description>Créer/utiliser une référence d'objet.</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='edit' />
                        <Step.Content>
                            <Step.Title>Objet</Step.Title>
                            <Step.Description>Saisir les informations de l'objet.</Step.Description>
                        </Step.Content>
                    </Step>

                    <Step disabled>
                        <Icon name='save' />
                        <Step.Content>
                            <Step.Title>Enregistrer.</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>
            </div>
        );
    }

}

export default GrimoireItemSteps;