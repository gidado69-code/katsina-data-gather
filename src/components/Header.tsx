import { motion } from "framer-motion";

export const Header = () => {
  return (
    <header className="relative w-full overflow-hidden rounded-xl shadow-lg mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60 z-10" />
      <img
        src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7ae0c262-05d7-4c43-9b06-54befa7ffc62/forum-banner-image-bf4a0674-1779123588814.webp"
        alt="Forum Banner"
        className="w-full h-48 md:h-64 object-cover"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            CONCERNED PRIVATE SECTOR CIVIL SERVANTS AND PENSIONERS FORUM
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl font-medium">
            KATSINA STATE CHAPTER
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-1 w-12 bg-white rounded-full" />
            <span className="text-white text-sm font-semibold tracking-widest uppercase">
              Data Collection Portal
            </span>
            <span className="h-1 w-12 bg-white rounded-full" />
          </div>
        </motion.div>
      </div>
    </header>
  );
};