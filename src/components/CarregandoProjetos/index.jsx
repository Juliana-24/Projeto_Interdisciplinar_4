import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function CarregandoProjetos() {
  let dados = ["primeiro", "segundo", "terceiro"];

  return (
    <Grid container wrap="nowrap">
      {dados.map((index) => (
        <Box key={index} sx={{ width: "80%", marginRight: 1, my: 5 }}>
          <Skeleton variant="rectangular" width={598} height={228} />
          <Box sx={{ pt: 1 }}>
            <Skeleton />
            <Skeleton width="50%" />
          </Box>
        </Box>
      ))}
    </Grid>
  );
}
