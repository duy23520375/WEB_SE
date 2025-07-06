import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box
} from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { IParty } from "../../interfaces/party.interface";
import { defaultBgColorMap } from "../../assets/color/ColorMap";

export default function ScheduleForm({
    open,
    onClose,
    initialData,
    date,
    onViewPartyDetail,
}: {
    open: boolean;
    onClose: () => void;
    initialData?: any;
    date: string;
    onViewPartyDetail: (party: any) => void
}) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
            sx={{
                '& .MuiPaper-root': {
                    padding: '26px 4px',
                    borderRadius: '15px',
                    maxWidth: '500px',
                },
                '& .MuiDialogContent-root': {
                    padding: 0,
                },
            }}
        >
            <DialogTitle sx={{
                padding: '8px 24px',
                paddingTop: '0px',
                fontWeight: 'bold',
                textAlign: 'center',
            }}>
                Tiệc tổ chức ngày {formatDate(date)}
            </DialogTitle>

            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '20px',
                }}>
                    {initialData.map((party: IParty) => (
                        <Box
                            key={party.id}
                            sx={{
                                borderRadius: '10px',
                                padding: '15px 20px',
                                cursor: 'pointer',
                                backgroundColor: defaultBgColorMap[party.shift],
                            }}
                            onClick={() => onViewPartyDetail(party)}
                        >
                            <Typography variant="body2" sx={{ textWrap: { xs: 'nowrap', md: 'wrap' }, }}>
                                {`${party.groom} & ${party.bride}`}
                            </Typography>
                            <Typography variant="caption">
                                {`${party.shift} - ${party.hall}`}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
