import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { LeaveProcess } from "../../features/flowScreens/LeaveProcess";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Leave Process" }));
  }, []);

  return <LeaveProcess />;
}

export default InternalPage;
