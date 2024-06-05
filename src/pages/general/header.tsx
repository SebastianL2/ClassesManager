import { Typography, Box, useTheme } from "@mui/material";
import { palette } from "../../theme";
interface HeaderProps {
    title: string;
    subtitle: string;
  }
  
  const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = palette(theme.palette.mode);
  return (
    <Box mb="15px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.grey[200]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;