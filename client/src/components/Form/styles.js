
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const styles =  {
    root: {
        '& .MuiTextFieldRoot': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: theme.spacing(1),
        height: '450px'
        
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: '10px',
    },
};

export default styles;