import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AppDownload = ({ match, name }) => {
    const [count, setCount] = useState('');
    const { imageIdx } = match.params;
    const [authYn, setAuthYn] = useState(false);

    useEffect(() => {

        if (sessionStorage.getItem('token') == null) {
            setAuthYn(false);
        } else {
            const token = sessionStorage.getItem('token');
            const decode_token = jwtDecode(token);
            let authIdx = decode_token.authIdx;
            if (authIdx === 3) {
                setAuthYn(true);
            } else {
                setAuthYn(false);
            }
        }

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/chart/count/${imageIdx}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                setCount(response.data.count);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    var xData = [], yData = [];
    for (const _c of count) {
        xData.push(_c.downloadDate);
        yData.push(_c.downloadCount);
    }

    const options = {
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false,
        },
        title: {
            margin: 45,
            text: name + ' 월간 차트 ',
            align: 'center',
            style: {
                'fontFamily': 'TheJamsil5Bold',
                'fontWeight': 'bold',
                'fontSize': '25px'
            }
        },
        subtitle: {
            text: '(건)',
            align: 'left',
            style: {
                'color': 'black',
                'fontFamily': 'TheJamsil5Bold',
                'fontWeight': 'bold'
            }
        },
        xAxis: {
            categories: xData,
            crosshair: true,

            labels: {
                style: {
                    'fontFamily': 'TheJamsil5Bold'
                }
            }
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                style: {
                    'fontFamily': 'TheJamsil5Bold'
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: '건',
            style: {
                'fontFamily': 'TheJamsil5Bold'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{y} 회'
                }
            },
        },
        series: [{
            name: '다운로드 수',
            data: yData,
            font: 'TheJamsil5Bold',
            color: '#609AF0'
        }],
        legend: {
            itemStyle: {
                'fontFamily': 'TheJamsil5Bold',
                'fontWeight': 'bold'
            }
        }
    };

    return (
        <>
            <div className="chart-container">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </>

    )
};
export default AppDownload;