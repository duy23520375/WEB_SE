import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import { PlusCircle, } from "lucide-react";
import PartyTable from "./PartyTable";
import { IParty } from "../../interfaces/party.interface";
import ConfirmDelete from "../../components/Alert/ConfirmDelete/ConfirmDelete";
import PartyForm from "../../components/Form/PartyForm";
import BillForm from "../../components/Form/BillForm";
import PartyFilter from "../../components/Filter/PartyFilter";
import SearchBar from "../../components/SearchBar"
import { DatePicker, } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";



type PartyKey = "groom" | "bride" | "phone" | "deposit" | "tables" | "reserveTables";

export default function PartyPage() {
    const navigate = useNavigate();

    const [parties, setParties] = useState<IParty[]>([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/tieccuoi")
            .then(res => res.json())
            .then(data => {
    const mapped = data.map((item: any, idx: number) => {
        let status = "Đã đặt cọc";
        if (item.DAHUY) status = "Đã huỷ";
        else if (item.DATHANHTOAN) status = "Đã thanh toán";
        else if (item.DATOCHUC) status = "Đã tổ chức";
        // Có thể bổ sung logic khác nếu cần
        return {
            code: `TC${(idx + 1).toString().padStart(2, "0")}`,
            id: item._id,
            groom: item.TENCR,
            bride: item.TENCD,
            phone: item.SDT,
            shift: item.CA,
            hall: item.MASANH,
            date: item.NGAYDAI,
            deposit: item.TIENCOC,
            tables: item.SOLUONGBAN,
            reserveTables: item.SOBANDT,
            status, // Thêm trường này
        };
    });
    setParties(mapped);
});
    }, []);

    // Các useState khác phải đặt ở đây, KHÔNG đặt sau useEffect!
    const [searchKey, setSearchKey] = useState("");
    const [searchBy, setSearchBy] = useState<PartyKey>("groom");
    const [filterShift, setFilterShift] = useState("");
    const [filterHall, setFilterHall] = useState("");
    const [fromDate, setFromDate] = useState(dayjs('2000-01-01').toISOString());
    const [toDate, setToDate] = useState(dayjs('2100-12-31').toISOString());
    const [isPartyFormOpen, setIsPartyFormOpen] = useState(false);
    const [isBillFormOpen, setIsBillFormOpen] = useState(false);
    const [editData, setEditData] = useState<IParty | null>(null);
    const [billPartyData, setBillPartyData] = useState<IParty | null>(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    
    const filteredParties = parties.filter((party) => {
        const partyDate = dayjs(party.date);
        const from = dayjs(fromDate);
        const to = dayjs(toDate);

        const matchesDate = partyDate.isAfter(from.subtract(1, 'day')) && partyDate.isBefore(to.add(1, 'day'));
        const matchesShift = filterShift ? party.shift === filterShift : true;
        const matchesHall = filterHall ? party.hall === filterHall : true;

        let matchesSearch = true;
        if (searchKey) {
            const value = party[searchBy];
            if (typeof value === "number") {
                matchesSearch = value === Number(searchKey);
            } else {
                matchesSearch = value?.toLowerCase().includes(searchKey.toLowerCase());
            }
        }

        return matchesDate && matchesShift && matchesHall && matchesSearch;
    });


    const handleAdd = () => {
        navigate("/dat-tiec");
    };

    const handleEdit = (party: IParty) => {
        setEditData(party);
        setIsPartyFormOpen(true);
    };

    const handleDelete = (id: any) => {
        setDeleteId(id);
        setIsDeleteConfirmOpen(true);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: "100%",
            overflow: 'hidden',
            backgroundColor: '#fff',
            borderRadius: '15px',
            paddingTop: '15px',
        }}>
            <Typography
                sx={{
                    userSelect: "none",
                    color: "var(--text-color)",
                    fontWeight: "bold",
                    fontSize: "32px",
                    marginX: "20px",
                }}
            >
                Danh sách tiệc cưới
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: "20px",
                    marginX: "20px",
                }}
            >
                <Box sx={{
                    display: 'flex',
                    gap: '10px',
                    width: "80%",
                    alignItems: 'flex-end',
                }}>
                    <Box sx={{ flex: 2 }}>
                        <SearchBar
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                        />
                    </Box>
                    
                    <FormControl
                        sx={{
                            flex: 1,
                            "& fieldset": {
                                borderRadius: "10px",
                            },
                            "& .MuiInputBase-input": {
                                paddingY: "10px",
                                paddingLeft: "14px",
                                backgroundColor: '#fff',
                            },
                        }}
                    >
                        <Select
                            value={searchBy}
                            onChange={(e) => setSearchBy(e.target.value as PartyKey)}

                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        boxSizing: 'border-box',
                                        padding: "0 8px",
                                        border: "1px solid #e4e4e7",
                                        "& .MuiMenuItem-root": {
                                            borderRadius: "6px",
                                            "&:hover": {
                                                backgroundColor: "rgba(117, 126, 136, 0.08)",
                                            },
                                            "&.Mui-selected": {
                                                backgroundColor: "#bcd7ff",
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            <MenuItem value="groom">
                                Tên chú rể
                            </MenuItem>
                            <MenuItem value="bride">
                                Tên cô dâu
                            </MenuItem>
                            <MenuItem value="phone">
                                Số điện thoại
                            </MenuItem>
                            <MenuItem value="deposit">
                                Tiền cọc
                            </MenuItem>
                            <MenuItem value="tables">
                                Số lượng bàn
                            </MenuItem>
                            <MenuItem value="reserveTables">
                                Số bàn dự trữ
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <PartyFilter
                        label="Chọn ca"
                        value={filterShift}
                        onChange={(e) => setFilterShift(e.target.value)}
                        children={["Trưa", "Tối"]}
                    />

                    <PartyFilter
                        label="Chọn sảnh"
                        value={filterHall}
                        onChange={(e) => setFilterHall(e.target.value)}
                        children={["A", "B", "C", "D", "E"]}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{
                            flexDirection: 'column',
                        }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Từ ngày
                            </Typography>
                            <DatePicker
                                value={dayjs(fromDate)}
                                format="DD/MM/YYYY"
                                onChange={(value) => setFromDate(value ? value.toISOString() : dayjs().startOf("year").toISOString())}

                                sx={{
                                    "& .MuiPickersInputBase-root": {
                                        backgroundColor: '#fff',
                                        borderRadius: "10px",
                                        gap: '5px',
                                    },
                                    "& .MuiPickersSectionList-root": {
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '43px',
                                        width: 'fit-content',
                                        paddingY: '0px',
                                    },
                                }}
                                slotProps={{
                                    popper: {
                                        sx: {
                                            '& .MuiPaper-root': {
                                                borderRadius: '20px',
                                            },
                                            '& .MuiDateCalendar-root': {
                                                padding: '18px 20px',
                                                gap: '10px',
                                                maxHeight: '360px',
                                                height: 'auto',
                                                width: '310px'
                                            },
                                            '& .MuiPickersCalendarHeader-root': {
                                                padding: '0 8px',
                                                margin: 0,
                                                justifyContent: 'space-between',
                                            },
                                            '& .MuiPickersCalendarHeader-labelContainer': {
                                                color: '#202224',
                                                fontWeight: 600,
                                                fontSize: '15px',
                                                margin: 0,
                                            },
                                            '& .MuiPickersArrowSwitcher-root': {
                                                gap: '5px'
                                            },
                                            '& .MuiPickersArrowSwitcher-button': {
                                                padding: 0,
                                                backgroundColor: '#e7e9ee',
                                                borderRadius: '5px'
                                            },
                                            '& .MuiTypography-root': {
                                                color: '#454545',
                                            },
                                            '& .MuiDayCalendar-slideTransition': {
                                                minHeight: 0,
                                                marginBottom: '4px'
                                            },
                                        },
                                    },
                                    day: {
                                        sx: {
                                            color: "#8f9091",
                                            borderRadius: '10px',
                                            '&:hover': {
                                                backgroundColor: '#e3f2fd',
                                            },
                                            '&.MuiPickersDay-root.Mui-selected': {
                                                backgroundColor: '#4880FF',
                                                color: '#fff',
                                                '&:hover': {
                                                    backgroundColor: '#4880FF'
                                                }
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{
                            flexDirection: 'column',
                        }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Đến ngày
                            </Typography>
                            <DatePicker
                                value={dayjs(toDate)}
                                format="DD/MM/YYYY"
                                onChange={(value) => setToDate(value ? value.toISOString() : dayjs().endOf("year").toISOString())}

                                sx={{
                                    "& .MuiPickersInputBase-root": {
                                        backgroundColor: '#fff',
                                        borderRadius: "10px",
                                        gap: '5px'
                                    },
                                    "& .MuiPickersSectionList-root": {
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '43px',
                                        width: 'fit-content',
                                        paddingY: '0px',
                                    },
                                }}
                                slotProps={{
                                    popper: {
                                        sx: {
                                            '& .MuiPaper-root': {
                                                borderRadius: '20px',
                                            },
                                            '& .MuiDateCalendar-root': {
                                                padding: '18px 20px',
                                                gap: '10px',
                                                maxHeight: '360px',
                                                height: 'auto',
                                                width: '310px'
                                            },
                                            '& .MuiPickersCalendarHeader-root': {
                                                padding: '0 8px',
                                                margin: 0,
                                                justifyContent: 'space-between',
                                            },
                                            '& .MuiPickersCalendarHeader-labelContainer': {
                                                color: '#202224',
                                                fontWeight: 600,
                                                fontSize: '15px',
                                                margin: 0,
                                            },
                                            '& .MuiPickersArrowSwitcher-root': {
                                                gap: '5px'
                                            },
                                            '& .MuiPickersArrowSwitcher-button': {
                                                padding: 0,
                                                backgroundColor: '#e7e9ee',
                                                borderRadius: '5px'
                                            },
                                            '& .MuiTypography-root': {
                                                color: '#454545',
                                            },
                                            '& .MuiDayCalendar-slideTransition': {
                                                minHeight: 0,
                                                marginBottom: '4px'
                                            },
                                        },
                                    },
                                    day: {
                                        sx: {
                                            color: "#8f9091",
                                            borderRadius: '10px',
                                            '&:hover': {
                                                backgroundColor: '#e3f2fd',
                                            },
                                            '&.MuiPickersDay-root.Mui-selected': {
                                                backgroundColor: '#4880FF',
                                                color: '#fff',
                                                '&:hover': {
                                                    backgroundColor: '#4880FF'
                                                }
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </LocalizationProvider>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<PlusCircle />}
                    onClick={handleAdd}
                    sx={{
                        alignSelf: 'flex-end',
                        padding: '10px 30px',
                        fontSize: "14px",
                        fontWeight: "bold",
                        borderRadius: '8px',
                        backgroundColor: "#4880FF",
                        "&:hover": {
                            backgroundColor: "#3578f0",
                        },
                        textTransform: "none",
                    }}
                >
                    Create
                </Button>
            </Box>

            {/* Table */}
            <PartyTable
                data={filteredParties}
                searchKey={searchKey}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            {/* Form + ConfirmDelete */}
            <PartyForm
                open={isPartyFormOpen}
                onClose={() => setIsPartyFormOpen(false)}
                onSubmit={(_data) => {
                    if (editData) {
                        // update logic
                    } else {
                        // add logic
                    }
                    setIsPartyFormOpen(false);
                }}
                onExportBill={(partyData) => {
                    setBillPartyData(partyData);
                    setIsPartyFormOpen(false);
                    setIsBillFormOpen(true);
                }}
                initialData={editData}
                readOnly={false}
            />

            <BillForm
                open={isBillFormOpen}
                onClose={() => setIsBillFormOpen(false)}
                initialData={billPartyData}
                readOnly={true}
            />

            <ConfirmDelete
                open={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={() => {
                    // delete logic using deleteId
                    setIsDeleteConfirmOpen(false);
                }}
            />
        </Box>
    );
}
