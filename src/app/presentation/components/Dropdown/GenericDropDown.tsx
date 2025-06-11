import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material';

interface GenericDropDownProps {
    label: string;
    value: string;
    onChange?: (e: SelectChangeEvent<string>) => void;
    options: Array<{ value: string; label: string }>;
    error?: boolean;
    helperText?: string;
    width?: string | { [key: string]: string }; 
    height?: string;
    margin?: string;
}

export const GenericDropDown: React.FC<GenericDropDownProps> = ({
    label,
    value, 
    onChange, 
    options, 
    error, 
    helperText,
    width = '100%',
    height = '100%',
    margin,
    }) => {
    return (
        <FormControl fullWidth margin="normal" error={error} sx={{ width, height, margin }}>
            <InputLabel>{label}</InputLabel>
            <Select value={value} onChange={onChange} label={label}>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};
