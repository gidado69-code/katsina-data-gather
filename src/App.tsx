import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { RegistrationForm } from "./components/RegistrationForm";
import { RecordTable } from "./components/RecordTable";
import { ForumRecord } from "./types/record";
import { getRecords, saveRecord, deleteRecord, exportToCSV } from "./lib/storage";
import { Toaster } from "./components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [records, setRecords] = useState<ForumRecord[]>([]);

  useEffect(() => {
    setRecords(getRecords());
  }, []);

  const handleAddRecord = (data: Omit<ForumRecord, "id" | "serialNo" | "createdAt">) => {
    const newRecord: ForumRecord = {
      ...data,
      id: crypto.randomUUID(),
      serialNo: records.length + 1,
      createdAt: new Date().toISOString(),
    };
    const updated = saveRecord(newRecord);
    setRecords(updated);
  };

  const handleDeleteRecord = (id: string) => {
    const updated = deleteRecord(id);
    // Recalculate serial numbers for consistency if needed, 
    // but usually S/NO is fixed at entry. 
    // However, if the user wants continuous numbering, we re-index:
    const reindexed = updated.map((r, i) => ({
      ...r,
      serialNo: updated.length - i
    }));
    setRecords(reindexed);
  };

  const handleExport = () => {
    exportToCSV(records);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        
        <main className="space-y-12">
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <RegistrationForm onSuccess={handleAddRecord} />
          </motion.section>

          <AnimatePresence>
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <RecordTable 
                records={records} 
                onDelete={handleDeleteRecord} 
                onExport={handleExport}
              />
            </motion.section>
          </AnimatePresence>
        </main>

        <footer className="mt-16 text-center text-slate-500 text-sm pb-8 border-t pt-8">
          <p>© {new Date().getFullYear()} Concerned Private Sector Civil Servants and Pensioners Forum, Katsina State.</p>
          <p className="mt-1">Dedicated to the welfare of civil servants and pensioners.</p>
        </footer>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;