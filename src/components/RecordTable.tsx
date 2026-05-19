import { ForumRecord } from "../types/record";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Trash2, Download, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface RecordTableProps {
  records: ForumRecord[];
  onDelete: (id: string) => void;
  onExport: () => void;
}

export const RecordTable = ({ records, onDelete, onExport }: RecordTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = records.filter((r) =>
    Object.values(r).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Card className="border-emerald-100 shadow-xl overflow-hidden mt-8">
      <CardHeader className="bg-emerald-50/50 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl text-emerald-900">Registered Members</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Total Records: <span className="font-bold text-emerald-700">{records.length}</span>
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              className="pl-8 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={onExport}
            className="flex items-center gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            disabled={records.length === 0}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-emerald-50/30">
              <TableRow>
                <TableHead className="font-bold text-emerald-900">S/NO</TableHead>
                <TableHead className="font-bold text-emerald-900">NAME</TableHead>
                <TableHead className="font-bold text-emerald-900">LG ORIGIN</TableHead>
                <TableHead className="font-bold text-emerald-900">PVC/DEL NO</TableHead>
                <TableHead className="font-bold text-emerald-900">PU / WARD</TableHead>
                <TableHead className="font-bold text-emerald-900">GSM NO</TableHead>
                <TableHead className="font-bold text-emerald-900">POSITION</TableHead>
                <TableHead className="font-bold text-emerald-900">ORGANIZATION</TableHead>
                <TableHead className="font-bold text-emerald-900 text-right">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <TableRow key={record.id} className="hover:bg-emerald-50/20 transition-colors">
                    <TableCell className="font-medium text-emerald-800">
                      {record.serialNo}
                    </TableCell>
                    <TableCell className="font-semibold">{record.name}</TableCell>
                    <TableCell>{record.lgOfOrigin}</TableCell>
                    <TableCell>
                      <code className="bg-slate-100 px-1 rounded text-xs">{record.pvcDelNo}</code>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p className="font-medium">{record.pollingUnit}</p>
                        <p className="text-muted-foreground">{record.ward}</p>
                      </div>
                    </TableCell>
                    <TableCell>{record.gsmNo}</TableCell>
                    <TableCell>{record.position}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="secondary" className="w-fit text-[10px] bg-emerald-100 text-emerald-800 border-emerald-200">
                          {record.orgType}
                        </Badge>
                        <span className="text-xs font-medium text-muted-foreground truncate max-w-[150px]">
                          {record.orgName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(record.id)}
                        className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center text-muted-foreground italic">
                    {searchTerm ? "No matching records found." : "No records registered yet."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};