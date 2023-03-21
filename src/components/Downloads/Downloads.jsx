import * as React from "react";
import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import DownloadIcon from "@material-ui/icons/GetApp";
import ApiQuery from "../utils/apiQuery/apiQuery";
let apiQuery = new ApiQuery();

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [listas, setListas] = React.useState([]);

  React.useEffect(() => {
    apiQuery.get(`/descargas/lista`).then((respuesta) => {
      setListas(respuesta);
    });
  }, []);

  function getFile(item) {
    apiQuery
      .getArchivo(`/descargas/lista/${item}`)
      .then((respuesta) => {
        const url = window.URL.createObjectURL(respuesta);
        const a = document.createElement("a");
        a.href = url;
        a.download = item;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        error = new Error();
      });
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Descargar listas
          </Typography>
          <Demo>
            <List dense={false}>
              {listas.length ? (
                <>
                  {listas.map((item) => (
                    <ListItem
                      key={item}
                      button
                      onClick={() => getFile(item)}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete">
                          <DownloadIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <FileIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item}
                        //     secondary={secondary ? "Secondary text" : null}
                      />
                    </ListItem>
                  ))}
                </>
              ) : (
                <></>
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
