import React from 'react';

class CollMgrSubMenu extends React.Component {
    render() {
        return (
            <div>

                <div class="row text-white p-2">
                    <div class="list-group w-100" id="list-tab" role="tablist">
                        <a class="list-group-item list-group-item-action active bg-orange font-weight-bold " id="list-home-list" data-toggle="list" href="#" role="tab" aria-controls="home">
                            <span role="img" aria-label="Home">🏠 </span>Home</a>
                        <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="/collmgr/GAM" role="tab" aria-controls="profile">
                            <span role="img" aria-label="Games">🎮 </span>Games&nbsp;<span class="badge badge-secondary">231</span></a>
                        <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">
                            <span role="img" aria-label="Movies">💿 </span>Movies&nbsp;<span class="badge badge-secondary">78</span></a>
                        <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">
                            <span role="img" aria-label="Books">📚 </span>Books&nbsp;<span class="badge badge-secondary">35</span></a>
                        <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">
                            <span role="img" aria-label="Boardgames">🎲 </span>Boardgames&nbsp;<span class="badge badge-secondary">23</span></a>
                        <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">
                            <span role="img" aria-label="WishList">🔖 </span>Wishlist</a>
                        <a class="list-group-item list-group-item-action disabled" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">
                            <span role="img" aria-label="Settings">⚙️ </span>Settings</a>
                    </div>
                </div>
            </div>

        );
    }
}

export default CollMgrSubMenu;
