import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface IBox {
    title: string
    value: string
    graph?: boolean
    graphData?: { labels: string[]; data: number[] }
}

const Box = ({ title, value, graph, graphData }: IBox) => {
    const data =
        graphData?.labels.map((label, index) => ({
            name: label,
            value: graphData.data[index],
        })) || []

    return (
        <div className="px-6 py-6 border border-solid bg-primarySupport rounded-2xl border-border">
            <p className="mb-1 font-standard-semibold text-primaryLight">{title}</p>
            <p className="text-white font-h4">{value}</p>
            {graph && graphData && (
                <div className="mt-4" style={{ height: "85px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#CDE4BA" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#CDE4BA" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <Tooltip />
                            <Area type="monotone" dataKey="value" stroke="#CDE4BA" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}

export default Box
