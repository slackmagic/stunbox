import React from 'react';
import { Message } from 'semantic-ui-react'

class saveMsg extends React.Component {

    render() {

        return (
            <div>
                {this.props.isCorrectlyUpdated !== undefined ?
                    (
                        this.props.isCorrectlyUpdated === true ?
                            (
                                < Message positive >
                                    <Message.Header>Mise à jour réussie.</Message.Header>
                                    <p>
                                        Les données ont été correctement sauvegardées.
                                    </p>
                                </Message >
                            ) : (
                                < Message negative >
                                    <Message.Header>Impossible de mettre à jour.</Message.Header>
                                    <p>
                                        Les données n'ont pas été correctement sauvegardées.
                                    </p>
                                    <p>
                                        <i>{this.props.errMessage}</i>
                                    </p>
                                </Message >
                            )
                    )
                    : (true)
                }
            </div>
        )
    }
}
export default saveMsg;