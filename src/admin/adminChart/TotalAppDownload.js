import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import jwtDecode from "jwt-decode";

function TotalAppDownload() {

    const [totalCount, setTotalCount] = useState('');
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

        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/admin/chart/totalappcount`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                setTotalCount(response.data.totalCount);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    var xData = [], yData = [];
    for (const _t of totalCount) {
        xData.push(_t.downloadDate);
        yData.push(_t.downloadCount);
    }

    const options = {
        chart: {
            type: 'column',
            height: "340px",
        },
        credits: {
            enabled: false,
        },
        title: {
            text: null
        },
        subtitle: {
            text: '(회)',
            align: 'left',
        },
        xAxis: {
            categories: xData,
            crosshair: true,
        },
        yAxis: {
            title: {
                text: null
            },
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: '회',
            style: {
                'font-family': 'TheJamsil5Bold'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{y} 회',
                    style: {
                        'font-family': 'SUITE-Regular',
                        'font-size': '18px'
                    }
                }
            }
        },
        series: [{
            name: '전체 앱 다운로드 수',
            data: yData,
            color: '#74a1f3'
        }],
    };

    return (
        <div id="totalAppDownload" className="chart-container">
            <div className="totalAppDownload-title">
                <p>전체 앱 다운로드 수</p>
            </div>
            <div className="totalAppDownloadChart-box">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    )
}
export default TotalAppDownload;