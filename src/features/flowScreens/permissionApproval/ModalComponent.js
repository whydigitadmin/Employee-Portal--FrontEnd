import Button from "@mui/material/Button";
import { default as React, useEffect, useState } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import ApprovalEmail from "../../../utils/ApprovalEmail";

const ModalComponent = ({ isOpen, closeModal, updateData, reqId }) => {
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = React.useState("");
  const [mailTo, setMailTo] = React.useState("");
  const [empName, setEmpName] = React.useState("");
  const [sendMail, setSendMail] = React.useState(false);
  const [mailStatus, setMailStatus] = React.useState("");

  const handleSave = () => {
    updatePermission();
    closeModal();
  };

  const updatePermission = async () => {
    try {
      if (reqId) {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/basicMaster/permissionRequestapp/${reqId}?id=${reqId}`,
          {
            approvedat: new Date().toISOString(),
            approvedby: localStorage.getItem("empcode"),
            requestid: reqId,
            status: status,
            remarks: remarks,
          }
        );

        if (response.status === 200) {
          setStatus("");
          setRemarks("");
          setSendMail(true);
          setEmpName(response.data.paramObjectsMap.PermissionRequestVO.empname);
          setMailTo(response.data.paramObjectsMap.PermissionRequestVO.empmail);
          setMailStatus(
            response.data.paramObjectsMap.PermissionRequestVO.status
          );
          setMessage("Your Permission Request has been ");
          closeModal();
        }
      }
    } catch (error) {
      console.error("Error updating leave request:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: isOpen ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "1",
        }}
      >
        <div
          style={{
            backgroundColor: "#fefefe",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "60%",
            maxWidth: "400px",
          }}
        >
          <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>
            Permission Approval
            <span
              style={{
                float: "right",
                fontSize: "25px",
                cursor: "pointer",
              }}
              onClick={closeModal}
            >
              &times;
            </span>
          </h2>
          <div style={{ marginBottom: "20px" }}>
            <FormControl
              variant="outlined"
              size="small"
              fullWidth
              style={{ marginBottom: "8px" }}
            >
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <TextField
              label="Remarks"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              maxRows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              style={{ marginBottom: "8px" }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ width: "100%" }}
          >
            Save
          </Button>
        </div>
      </div>
      {sendMail && (
        <ApprovalEmail
          to_email={mailTo}
          to_name={empName}
          message={message}
          status={mailStatus}
        />
      )}
    </>
  );
};

export default ModalComponent;
