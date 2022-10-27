import { BarChart, Bar, XAxis, Tooltip } from 'recharts'
import React, { useEffect, useState } from 'react'
import { AreaChart, Area } from 'recharts'
const range = (start, end, step = 1) => {
  let output = []
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += step) {
    output.push(i)
  }
  return output
}
const data = [
  {
    name: 'Page A',
    value: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    value: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    value: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    value: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    value: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    value: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    value: 3490,
    pv: 4300,
    amt: 2100,
  },
]

export function TrendChart({ skillName, skillTs }) {
  //const skillName = 'Machine learning'

  return (
    <div className="">
      <AreaChart
        width={200}
        height={50}
        data={skillTs}
        // margin={{
        //   top: 5,
        //   right: 5,
        //   left: 5,
        //   bottom: 5,
        // }}
      >
        <defs>
          <linearGradient id="value" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#CA8A05" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#CA8A05" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Area
          // type="monotone"
          strokeWidth={3}
          dataKey="value"
          stroke="#CA8A05"
          fillOpacity={1}
          fill="url(#value)"
        />
      </AreaChart>
      <p className="   text-truncate font-mono font-semibold ">{skillName}</p>
    </div>
  )
}
