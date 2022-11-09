import { ListItem, Checkbox, ListItemButton, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import Work, { WorkNameType } from "../../Models/Work";

interface Props {
  _work: Work
  changeWorks: (newWork: WorkNameType) => void
  checked: boolean
}
function ListItemWork({ _work, checked, changeWorks }: Props) {
  const labelId = `checkbox-list-secondary-label-${_work.name}`;

  return (
    <ListItem
      onClick={() => changeWorks(_work.name)}
      key={_work.name}
      secondaryAction={
        <Checkbox
          edge="end"
          checked={checked}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      }
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar
            alt={`Item n°${_work.name + 1}`}
            src={_work.img}
          />
        </ListItemAvatar>
        <ListItemText id={labelId} primary={_work.name} />
      </ListItemButton>
    </ListItem>
  )
}

export default ListItemWork;