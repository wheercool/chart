import React, { Component } from 'react';


let defaultGroups = [];
for (var i = 0; i < 3; i++) {
    defaultGroups.push({
        name: 'Group' + i
    })
}

class Groups extends Component {
    render() {
        const { groups = defaultGroups} = this.props;
        return (
            <div>
                <h4>Groups:</h4>
                <ul className="nav nav-pills">
                    {groups.map(this.renderGroupItem.bind(this))}                  
                </ul>
            </div>
        )
    }

    renderGroupItem(group, idx) {
        return (<li role="presentation" key={idx} className={!idx?"active": ""}><a href="#">{group.name}</a></li>)
    }
}

export default Groups;