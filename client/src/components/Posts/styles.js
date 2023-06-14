import { createTheme } from '@mui/material/styles';
const theme = createTheme();

const styles = {
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    actionDiv: {
        textAlign: 'center',
    },
};
export default styles;
