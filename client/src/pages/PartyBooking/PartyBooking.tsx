import { useForm, FormProvider } from "react-hook-form";
import PartyStepper from "./PartyStepper";

export default function PartyBooking() {
    const methods = useForm({
        defaultValues: {
            groom: "",
            bride: "",
            phone: "",
            date: "",
            shift: "",
            hall: "",
            tables: "",
            reserveTables: "",
            foods: "",
            services: "",
        },
        mode: "onTouched", // để trigger validate chính xác
    });
    return (
        <FormProvider {...methods}>
            <PartyStepper />
        </FormProvider>
    );
}
