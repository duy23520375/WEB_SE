import { useState, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { Box, FormControl, MenuItem, Paper, Select, Typography } from "@mui/material";
import dayjs from "dayjs";
import { IMonthlyReport } from "../../interfaces/report.interface";

// 🧪 Fake data 30 ngày
const fakeData: IMonthlyReport[] = Array.from({ length: 30 }, (_, i) => {
    const eventCount = Math.floor(Math.random() * 10) + 1;
    const revenue = Math.floor(Math.random() * 10000000) + 1000000;
    return {
        day: i + 1,
        eventCount,
        revenue,
    };
});

export default function RevenueReport() {
    const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month() + 1);
    const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
    const currentYear = (new Date()).getFullYear();

    const totalEvent = useMemo(
        () => fakeData.reduce((sum, d) => sum + d.eventCount, 0),
        [fakeData]
    );

    const totalRevenue = useMemo(
        () => fakeData.reduce((sum, d) => sum + d.revenue, 0),
        [fakeData]
    );

    const chartData = useMemo(() => {
        return fakeData.map((d) => ({
            ...d,
            percent: ((d.revenue / totalRevenue) * 100).toFixed(2),
        }));
    }, [fakeData, totalRevenue]);

    const options = {
        tooltip: {
            trigger: "axis",
            textStyle: {
                fontFamily: 'Times New Roman, Times, serif'
            },
            formatter: function (params: any[]) {
                const dayIndex = params[0].dataIndex;
                const data = chartData[dayIndex];
                return `
                    Ngày ${data.day}/${selectedMonth}/${selectedYear}<br/>
                    Số tiệc: ${data.eventCount}<br/>
                    Doanh thu: ${data.revenue.toLocaleString()} VND<br/>
                    Tỉ lệ doanh thu: ${data.percent}%
                `;
            },
        },
        legend: {
            data: ["Số tiệc", "Doanh thu"],
            itemGap: 50,
            top: 'bottom',
            textStyle: {
                fontSize: 16,
                fontFamily: 'Times New Roman, Times, serif'
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "10%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: chartData.map((d) => d.day),
        },
        yAxis: [
            {
                type: "value",
                name: "Số tiệc",
                position: "left",
            },
            {
                type: "value",
                name: "Doanh thu",
                position: "right",
                axisLabel: {
                    formatter: (v: number) => `${(v / 1e6)}tr`,
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                    }
                }
            },
        ],
        series: [
            {
                name: "Số tiệc",
                type: "bar",
                data: chartData.map((d) => d.eventCount),
                barWidth: '60%',
                itemStyle: {
                    borderRadius: [8, 8, 0, 0] // Bo tròn đỉnh cột
                }
            },
            {
                name: "Doanh thu",
                type: "line",
                yAxisIndex: 1,
                data: chartData.map((d) => d.revenue),
                lineStyle: { color: "#FF9800" },
                itemStyle: { color: "#FF9800" },
            },
        ],
    };

    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: "30px 5px",
                borderRadius: "15px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    padding: "0 24px",
                    mb: "20px",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}
                >
                    Biểu đồ doanh thu tháng
                </Typography>
                <FormControl sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <Typography sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}>
                        Tháng:
                    </Typography>
                    <Select
                        defaultValue={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        sx={{
                            "& fieldset": {
                                borderRadius: "8px",
                            },
                            "& .MuiInputBase-input": {
                                padding: "8px 14px",
                            },
                        }}
                    >
                        {[...Array(12)].map((_, index) => {
                            const month = 12 - index;
                            return (
                                <MenuItem key={month} value={month}>
                                    {month}
                                </MenuItem>
                            );
                        })}
                    </Select>

                    <Typography sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginLeft: '10px',
                    }}>
                        Năm:
                    </Typography>
                    <Select
                        defaultValue={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        sx={{
                            "& fieldset": {
                                borderRadius: "8px",
                            },
                            "& .MuiInputBase-input": {
                                padding: "8px 14px",
                            },
                        }}
                    >
                        {[...Array(currentYear - 2023 + 1)].map((_, index) => {
                            const year = currentYear - index;
                            return (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{
                display: "flex",
                gap: 10,
                mb: "10px",
                alignSelf: 'center',
            }}>
                <Typography sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                }}>
                    Tổng số tiệc: {totalEvent}
                </Typography>

                <Typography sx={{
                    fontSize: "18px",
                    fontWeight: "bold",
                }}>
                    Tổng doanh thu: {totalRevenue.toLocaleString()} VND
                </Typography>
            </Box>

            <ReactECharts option={options} style={{ height: 500 }} />
        </Paper>
    );
}
