import React, {useEffect, useState} from 'react';
import { List, Tabs } from 'antd';
import { Line } from "react-chartjs-2"

const { TabPane } = Tabs;

const Artist = (props) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const chart = () => {
            const albumScores = [];
            const albumNames = [];
            for (const dataObj of props.data) {
                albumScores.push(dataObj.sentimentVal);
                albumNames.push(dataObj.name);
            }
            setChartData({
                labels: albumNames,
                datasets: [
                    {
                        label: "Sentiment",
                        data: albumScores,
                        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                        borderWidth: 4,
                        fill: false,
                        borderColor: "#ADD8E6"
                    }
                ]
            });
        };
        chart();
    }, [props]);

    return (
        <div>
            <br></br>
            <h2>{props.artist_name}</h2>
        <Tabs defaultActiveKey="albums" >
                <TabPane tab="Albums" key="albums">
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
                                    title={<a href={`/artist/${item.id}`}>{item.name}</a>}
                                    description={item.sentimentVal}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </TabPane>
                <TabPane tab="Graph of sentiment over albums" key="graph">
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            title: { text: "Sentiment over Albums", display: true },
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            autoSkip: true,
                                            maxTicksLimit: 10,
                                            beginAtZero: true
                                        },
                                        gridLines: {
                                            display: true
                                        }
                                    }
                                ],
                                xAxes: [
                                    {
                                        gridLines: {
                                            display: true
                                        }
                                    }
                                ]
                            }
                        }}
                    />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Artist;