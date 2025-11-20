import { useState } from "react";

export default function useSubmit() {
  const [submittedData, setSubmittedData] = useState(null);

  return [submittedData, setSubmittedData];
}
