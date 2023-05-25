import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";
import { useEffect } from "react";
import './chart.css';


const ReviewChart = ({ imageIdx }) => {
    const [reviewRatio, setReviewRatio] = useState([]);

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/user/applist/score/${imageIdx}`)
            .then(res => {
                console.log(res.data);
                const ratioArr = [res.data.ratio5, res.data.ratio4, res.data.ratio3, res.data.ratio2, res.data.ratio1];
                setReviewRatio(ratioArr);
                console.log(ratioArr);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const data = reviewRatio;
    const newData = [100 - data[0], 100 - data[1], 100 - data[2], 100 - data[3], 100 - data[4]];

    const options = {
        colors: [
            '#A7A7A7', '#000000'
        ],
        chart: {
            type: 'column',
            height: 160,
            width: 330
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: ['5점', '4점', '3점', '2점', '1점']
        },
        yAxis: {
            title: '',
            stackLabels: {
                enabled: false
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            allowPointSelect: false,
            column: {
                stacking: 'percent'
            },
            series: {
                animation: false,
                enableMouseTracking: false,
                pointWidth: 10
            }
        }
        ,
        series: [{
            name: '전체',
            data: newData
        }, {
            name: '사용자',
            data: data
        }]

    }

    return (
        <>
            <div className='subtitle'>
                <ul>
                    <li>{reviewRatio[0]}%</li>
                    <li>{reviewRatio[1]}%</li>
                    <li>{reviewRatio[2]}%</li>
                    <li>{reviewRatio[3]}%</li>
                    <li>{reviewRatio[4]}%</li>
                </ul>
            </div>
            <div ></div>
            <HighchartsReact className="appdetial-review" highcharts={Highcharts} options={options} />
        </>)
        ;
}
export default ReviewChart;