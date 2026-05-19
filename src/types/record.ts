export interface ForumRecord {
  id: string;
  serialNo: number;
  name: string;
  lgOfOrigin: string;
  pvcDelNo: string;
  pollingUnit: string;
  ward: string;
  gsmNo: string;
  position: string;
  orgType: "MDA" | "LGA" | "LEA" | "HOSPITAL" | "PHC" | "SCHOOL";
  orgName: string;
  createdAt: string;
}