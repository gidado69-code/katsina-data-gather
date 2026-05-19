import { ForumRecord } from "../types/record";

const STORAGE_KEY = "forum_data_records";

export const getRecords = (): ForumRecord[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveRecord = (record: ForumRecord) => {
  const records = getRecords();
  const updated = [record, ...records];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteRecord = (id: string) => {
  const records = getRecords();
  const updated = records.filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const exportToCSV = (records: ForumRecord[]) => {
  if (records.length === 0) return;

  const headers = [
    "S/NO",
    "NAME",
    "LG OF ORIGIN",
    "PVC/DEL NO",
    "POLLING UNIT",
    "WARD",
    "GSM NO",
    "POSITION",
    "ORGANIZATION TYPE",
    "ORGANIZATION NAME",
    "DATE CREATED"
  ];

  const rows = records.map((r) => [
    r.serialNo.toString(),
    r.name,
    r.lgOfOrigin,
    r.pvcDelNo,
    r.pollingUnit,
    r.ward,
    r.gsmNo,
    r.position,
    r.orgType,
    r.orgName,
    new Date(r.createdAt).toLocaleDateString()
  ]);

  const newline = String.fromCharCode(10);
  const csvContent = headers.join(",") + newline + 
    rows.map((row) => row.map(v => '"' + v + '"').join(",")).join(newline);

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  const dateStr = new Date().toISOString().split("T")[0];
  link.setAttribute("download", "forum_records_" + dateStr + ".csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};