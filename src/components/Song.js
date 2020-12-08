import React from 'react';
import { List } from 'antd';

const Song = (props) => {
    return (
        <div>
            <br></br>
            <h2>{props.album_name}</h2>
            <List
                itemLayout="horizontal"
                dataSource={props.data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href={`/album/${item.id}`}>{item.title}</a>}
                            description={item.sentiment}
                        />
                    </List.Item>
                )}
            />
         </div>
    )
}

export default Song;