export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/5 bg-[--background]">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs md:text-sm text-[--color-muted-foreground] uppercase tracking-wider font-mono">
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[--accent-primary] rounded-none rotate-45" />
            <span className="font-bold text-white tracking-[0.2em]">MagnaCV</span>
        </div>
        
        <p className="opacity-50">© {new Date().getFullYear()} MagnaCV. The Invisible ATS.</p>
        
        <div className="flex gap-8">
            <a href="https://www.linkedin.com/in/iamutkarshyadav/" target="_blank" rel="noopener noreferrer" className="hover:text-[--accent-primary] transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
