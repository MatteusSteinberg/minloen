import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js"
import { useRef } from "react"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface IBox {
    title: string
    value: string
    graph?: boolean
    graphData?: { labels: string[]; data: number[] }
}

const Box = ({ title, value, graph, graphData }: IBox) => {
    const chartRef = useRef<any>(null)

    const chartData = {
        labels: graphData?.labels || [],
        datasets: [
            {
                label: "Dataset",
                data: graphData?.data || [],
                fill: true,
                backgroundColor: "rgb(224,144,223, 0.4)",
                pointBackgroundColor: "#CDE4BA",
                borderColor: "#CDE4BA",
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    }

    const options = {
        scales: {
            x: {
                display: false,

                ticks: {
                    color: "#ffffff",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                display: false,
                title: {
                    display: true,
                    text: "Value",
                    color: "#ffffff",
                    font: {
                        size: 12,
                        weight: "bold",
                    },
                },
                ticks: {
                    color: "#ffffff",
                },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        elements: {
            point: {
                radius: 3,
            },
        },
    }

    return (
        <div className="px-6 py-6 border border-solid bg-primarySupport rounded-2xl border-border">
            <p className="mb-1 font-standard-semibold text-primaryLight">{title}</p>
            <p className="text-white font-h4">{value}</p>
            {graph && graphData && (
                <div className="mt-4">
                    <Line ref={chartRef} data={chartData} options={options as any} />
                </div>
            )}
        </div>
    )
}

export default Box
