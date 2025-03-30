const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div style={{display:"flex",flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Shoppy Scan. All rights reserved.
        </p>
<p>support@shoppyscan.ca</p>
      </div>
    </footer>
  );
};

export default Footer;
