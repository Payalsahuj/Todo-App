import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export const Button = ({
  varient,
  label,
  startIcon,
  onClick,
}: {
  varient: string;
  label: string;
  startIcon: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      id="export-btn"
      className={`btn ${varient} whitespace-normal text-ellipsis overflow-hidden`}
      onClick={onClick}
    >
      {startIcon ? <InsertDriveFileIcon /> : <></>}
      {label}
    </button>
  );
};
