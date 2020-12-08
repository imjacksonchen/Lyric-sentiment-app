import React from 'react';
import { List } from 'antd';


const Artist = (props) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 5,
            }}
            dataSource={props.data}
            renderItem={item => (
                <List.Item
                    key={item.name}
                    actions={[]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src={item.picture}
                        />
                    }
                >
                    <List.Item.Meta
                        title={<a href={`/${item.id}`}>{item.name}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />
    )
}

export default Artist;