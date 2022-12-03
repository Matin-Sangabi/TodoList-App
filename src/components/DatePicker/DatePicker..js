import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./datapicker.css";
export default function SelectDatePicker({value , setValue}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const systemMode = () => {
    localStorage.removeItem("theme");
    return prefersDarkMode ? "dark" : "light";
  };
  const selectedThem =
    JSON.parse(localStorage.getItem("theme")) || systemMode();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: selectedThem,
          background: {
            default: selectedThem === "dark" ? "#041955" :'#fff',
            paper: selectedThem === "dark" ? "#041955" : '#fff',
          },
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          className="rounded-2xl"
          renderInput={(props) => <TextField className="" {...props} />}
          label="Date Task"
          value={value}
          onChange={(newValue) => {
            if(newValue){
                setValue(new Date(newValue.$d).toISOString());
            }
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
