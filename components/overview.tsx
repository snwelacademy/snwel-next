/* eslint-disable @typescript-eslint/no-explicit-any */
import {useYearlySalesData } from '@/hooks/useAnalytics';
import { getCurrencySymbol } from '@/lib/utils';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export function Overview() {
  const {data} = useYearlySalesData()
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any) => `${getCurrencySymbol('INR')}${value}`}
        />
        <Bar dataKey="totalAmount" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}