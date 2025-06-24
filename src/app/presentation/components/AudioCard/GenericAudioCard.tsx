import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks6Icon from '@mui/icons-material/Looks6';
import LockIcon from '@mui/icons-material/Lock';
import theme from '../../../../theme/theme';


interface GenericAudioCardProps {
    weekNumber: number;
    title: string;
    currentDay?: number;
    isBlocked?: boolean;
    onClick?: () => void;
}

const GenericAudioCard: React.FC<GenericAudioCardProps> = ({
    weekNumber,
    title,
    currentDay = 1,
    isBlocked = true,
    onClick,
}) => {
    const totalDays = 7;
    const progress = (currentDay / totalDays) * 100;

    const  card = {
        color: isBlocked ? theme.palette.secondary[100] : theme.palette.secondary[1000],
    };
    
    const icon = {
            backgroundColor: isBlocked ? theme.palette.secondary[1000] : theme.palette.secondary[300],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            marginRight: '16px',

    };

    const active = {
        backgroundColor: theme.palette.neutrals.baseWhite,
        opacity: 1,
        pointerEvents: 'auto',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column', 
        width: '100%', 
        padding:'16px', 
        borderRadius: '8px', 
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
        };

    const blocked = {
        backgroundColor: 'transparent',
        opacity: 0.5,
        pointerEvents: 'none',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column', 
        width: '100%', 
        padding:'16px', 
        borderRadius: '8px', 
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', 
    };

    const status = isBlocked ? blocked : active;

    const progress_bar = {
        height: '8px', 
        borderRadius:'10px',
        backgroundColor: theme.palette.secondary[1000] };
    const getIcon = () => {
        if (isBlocked) {
            return <LockIcon style={card} />;
        }

        switch (weekNumber) {
            case 1:
                return <LooksOneIcon style={card} />;
            case 2:
                return <LooksTwoIcon style={card} />;
            case 3:
                return <Looks3Icon style={card} />;
            case 4:
                return <Looks4Icon style={card} />;
            case 5:
                return <Looks5Icon style={card} />;
            case 6:
                return <Looks6Icon style={card} />;
            default:
                return <LooksOneIcon style={card} />;
        }
    };

    return (
        <Box sx={status}
        onClick={onClick}
        role="cell">
            <Box style={{display:'flex',
                        alignItems: 'center',
                        marginBottom: '5px'}}>
                <Box
                    style={icon}
                >
                    {getIcon()}
                </Box>
                <Box style={{flexGrow:'1'}}>
                    <Typography
                        variant="subtitle1"
                        style={{color: theme.palette.secondary[1000], 
                                fontSize:'14px'}}
                    >
                        Semana {weekNumber}
                    </Typography>
                    <Typography
                        variant="body2"
                        style={{color: theme.palette.secondary[1000], 
                                fontSize:'12px'}}
                    >
                        {title}
                    </Typography>
                </Box>
                {!isBlocked && (
                    <PlayCircleIcon style={{color: theme.palette.secondary[1000]}} />
                )}
            </Box>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={progress_bar}
            />
            <Box 
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '5px',
            }}>
                <Typography
                style={{color: theme.palette.secondary[1000],}}
                    variant="caption"
                >
                    {isBlocked ? 'Bloqueado' : `${currentDay}/${totalDays} dias`}
                </Typography>
            </Box>
        </Box>
    );
};

export default GenericAudioCard;



