const Footer = () => {
  return (
    <footer className="bg-orange-50 text-gray-700 px-4 py-6 shadow border-t">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} StackJobs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
